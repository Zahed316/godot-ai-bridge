import type { IncomingMessage } from "node:http";

import {
  HANDSHAKE_PROTOCOL_VERSION,
  HANDSHAKE_SERVER_NAME,
  READ_ONLY_BRIDGE_METHODS,
  WEBSOCKET_HOST,
  WEBSOCKET_PATH,
  WEBSOCKET_PORT,
  type BridgeErrorResponse,
  type BridgeConnectionState,
  type BridgeHandshakeRequest,
  type BridgeHandshakeResponse,
  type BridgeReadOnlyRequest,
  type BridgeReadOnlyResponse,
  type ReadOnlyBridgeMethod,
} from "@godot-ai-bridge/protocol";
import { WebSocket, WebSocketServer } from "ws";

export type LocalWebSocketBridgeStatus = {
  websocketListening: boolean;
  websocketHost: typeof WEBSOCKET_HOST;
  websocketPort: typeof WEBSOCKET_PORT;
  godotConnected: boolean;
  lastHandshakeAt: string | null;
  connectionState: BridgeConnectionState;
};

const state: LocalWebSocketBridgeStatus = {
  websocketListening: false,
  websocketHost: WEBSOCKET_HOST,
  websocketPort: WEBSOCKET_PORT,
  godotConnected: false,
  lastHandshakeAt: null,
  connectionState: "disconnected",
};

let bridgeServer: WebSocketServer | null = null;
let activeSocket: WebSocket | null = null;
let nextRequestId = 1;

const pendingRequests = new Map<
  string,
  {
    resolve: (value: Record<string, unknown> | BridgeErrorResponse) => void;
    timeout: NodeJS.Timeout;
  }
>();

function isHandshakeRequest(value: unknown): value is BridgeHandshakeRequest {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    candidate["type"] === "bridge.handshake" &&
    candidate["protocolVersion"] === HANDSHAKE_PROTOCOL_VERSION &&
    candidate["clientName"] === "godot-editor-plugin" &&
    typeof candidate["sentAt"] === "string"
  );
}

function sendJson(socket: WebSocket, payload: unknown): void {
  socket.send(JSON.stringify(payload));
}

function bridgeError(code: string, message: string, suggestions: string[] = []): BridgeErrorResponse {
  return {
    ok: false,
    error: {
      code,
      message,
      details: {},
      suggestions,
    },
  };
}

function rejectMessage(socket: WebSocket, message: string): void {
  const error = bridgeError("METHOD_NOT_FOUND", message);
  sendJson(socket, {
    ...error,
  });
}

function requestIsAllowed(request: IncomingMessage): boolean {
  const url = new URL(request.url ?? "/", `http://${WEBSOCKET_HOST}`);
  return url.pathname === WEBSOCKET_PATH;
}

export function getLocalWebSocketBridgeStatus(): LocalWebSocketBridgeStatus {
  return { ...state };
}

function isReadOnlyBridgeMethod(method: unknown): method is ReadOnlyBridgeMethod {
  return (
    typeof method === "string" &&
    (READ_ONLY_BRIDGE_METHODS as readonly string[]).includes(method)
  );
}

function isReadOnlyResponse(value: unknown): value is BridgeReadOnlyResponse {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    candidate["type"] === "bridge.response" &&
    typeof candidate["id"] === "string" &&
    typeof candidate["result"] === "object" &&
    candidate["result"] !== null
  );
}

function clearPendingRequests(response: BridgeErrorResponse): void {
  for (const pending of pendingRequests.values()) {
    clearTimeout(pending.timeout);
    pending.resolve(response);
  }
  pendingRequests.clear();
}

export function createBridgeNotConnectedError(): BridgeErrorResponse {
  return bridgeError("BRIDGE_NOT_CONNECTED", "Godot is not connected to the local bridge.", [
    "Open the Godot project.",
    "Enable or reload the godot-ai-bridge editor plugin.",
    `Confirm the plugin can reach ws://${WEBSOCKET_HOST}:${WEBSOCKET_PORT}${WEBSOCKET_PATH}.`,
  ]);
}

export async function sendReadOnlyBridgeRequest(
  method: ReadOnlyBridgeMethod,
  params: Record<string, never> = {},
): Promise<Record<string, unknown> | BridgeErrorResponse> {
  if (!isReadOnlyBridgeMethod(method)) {
    return bridgeError("METHOD_NOT_FOUND", `Unsupported read-only bridge method: ${String(method)}`);
  }

  if (activeSocket === null || activeSocket.readyState !== WebSocket.OPEN || !state.godotConnected) {
    return createBridgeNotConnectedError();
  }

  const id = `request-${nextRequestId}`;
  nextRequestId += 1;

  const request: BridgeReadOnlyRequest = {
    type: "bridge.request",
    id,
    method,
    params,
  };

  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      pendingRequests.delete(id);
      resolve(bridgeError("TIMEOUT", `Timed out waiting for Godot response to ${method}.`));
    }, 5000);

    pendingRequests.set(id, { resolve, timeout });
    sendJson(activeSocket as WebSocket, request);
  });
}

export function startLocalWebSocketServer(): void {
  if (bridgeServer !== null) {
    return;
  }

  bridgeServer = new WebSocketServer({
    host: WEBSOCKET_HOST,
    port: WEBSOCKET_PORT,
    path: WEBSOCKET_PATH,
  });

  bridgeServer.on("listening", () => {
    state.websocketListening = true;
    state.connectionState = "listening";
    console.error(
      `[godot-ai-bridge] WebSocket listening on ws://${WEBSOCKET_HOST}:${WEBSOCKET_PORT}${WEBSOCKET_PATH}`,
    );
  });

  bridgeServer.on("connection", (socket, request) => {
    if (!requestIsAllowed(request)) {
      socket.close(1008, "Invalid bridge path");
      return;
    }

    let handshakeAccepted = false;

    socket.on("message", (data) => {
      if (handshakeAccepted) {
        let responsePayload: unknown;
        try {
          responsePayload = JSON.parse(data.toString());
        } catch {
          rejectMessage(socket, "Invalid JSON message.");
          return;
        }

        if (!isReadOnlyResponse(responsePayload)) {
          rejectMessage(socket, "Only read-only bridge responses are accepted after handshake.");
          return;
        }

        const pending = pendingRequests.get(responsePayload.id);
        if (pending === undefined) {
          rejectMessage(socket, `No pending request for response id ${responsePayload.id}.`);
          return;
        }

        clearTimeout(pending.timeout);
        pendingRequests.delete(responsePayload.id);
        pending.resolve(responsePayload.result);
        return;
      }

      let payload: unknown;
      try {
        payload = JSON.parse(data.toString());
      } catch {
        rejectMessage(socket, "Invalid JSON message.");
        return;
      }

      if (!isHandshakeRequest(payload)) {
        rejectMessage(socket, "Only bridge.handshake is supported in Phase 4.");
        return;
      }

      const receivedAt = new Date().toISOString();
      const response: BridgeHandshakeResponse = {
        type: "bridge.handshake.response",
        ok: true,
        protocolVersion: HANDSHAKE_PROTOCOL_VERSION,
        serverName: HANDSHAKE_SERVER_NAME,
        receivedAt,
      };

      state.godotConnected = true;
      state.lastHandshakeAt = receivedAt;
      state.connectionState = "connected";
      handshakeAccepted = true;
      activeSocket = socket;
      sendJson(socket, response);
    });

    socket.on("close", () => {
      if (activeSocket === socket) {
        activeSocket = null;
      }
      state.godotConnected = false;
      state.connectionState = state.websocketListening ? "listening" : "disconnected";
      clearPendingRequests(createBridgeNotConnectedError());
    });
  });

  bridgeServer.on("error", (error) => {
    state.websocketListening = false;
    state.godotConnected = false;
    state.connectionState = "error";
    console.error("[godot-ai-bridge] WebSocket server error", error);
  });
}
