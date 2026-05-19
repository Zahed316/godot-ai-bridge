import type { IncomingMessage } from "node:http";

import {
  HANDSHAKE_PROTOCOL_VERSION,
  HANDSHAKE_SERVER_NAME,
  WEBSOCKET_HOST,
  WEBSOCKET_PATH,
  WEBSOCKET_PORT,
  type BridgeConnectionState,
  type BridgeHandshakeRequest,
  type BridgeHandshakeResponse,
} from "@godot-ai-bridge/protocol";
import { WebSocketServer, type WebSocket } from "ws";

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

function rejectMessage(socket: WebSocket, message: string): void {
  sendJson(socket, {
    ok: false,
    error: {
      code: "METHOD_NOT_FOUND",
      message,
      details: {},
      suggestions: [],
    },
  });
}

function requestIsAllowed(request: IncomingMessage): boolean {
  const url = new URL(request.url ?? "/", `http://${WEBSOCKET_HOST}`);
  return url.pathname === WEBSOCKET_PATH;
}

export function getLocalWebSocketBridgeStatus(): LocalWebSocketBridgeStatus {
  return { ...state };
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
        rejectMessage(socket, "Only the initial handshake is supported in Phase 4.");
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
      sendJson(socket, response);
    });

    socket.on("close", () => {
      state.godotConnected = false;
      state.connectionState = state.websocketListening ? "listening" : "disconnected";
    });
  });

  bridgeServer.on("error", (error) => {
    state.websocketListening = false;
    state.godotConnected = false;
    state.connectionState = "error";
    console.error("[godot-ai-bridge] WebSocket server error", error);
  });
}
