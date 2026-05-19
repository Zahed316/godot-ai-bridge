export const PROJECT_NAME = "godot-ai-bridge" as const;
export const PROTOCOL_VERSION = "phase-4" as const;

export type PhaseName =
  | "phase-0"
  | "phase-1"
  | "phase-2a"
  | "phase-2b"
  | "phase-3"
  | "phase-4";

export const CURRENT_PHASE: PhaseName = "phase-4";

export const BRIDGE_STATUS_TOOL = "bridge.status" as const;
export const BRIDGE_GET_CAPABILITIES_TOOL = "bridge.get_capabilities" as const;

export const BRIDGE_TOOL_NAMES = [
  BRIDGE_STATUS_TOOL,
  BRIDGE_GET_CAPABILITIES_TOOL,
] as const;

export type BridgeToolName = (typeof BRIDGE_TOOL_NAMES)[number];

export const WEBSOCKET_HOST = "127.0.0.1" as const;
export const WEBSOCKET_PORT = 6505 as const;
export const WEBSOCKET_PATH = "/godot-ai-bridge" as const;
export const HANDSHAKE_PROTOCOL_VERSION = "phase-4-handshake" as const;
export const HANDSHAKE_CLIENT_NAME = "godot-editor-plugin" as const;
export const HANDSHAKE_SERVER_NAME = "godot-ai-bridge-mcp-server" as const;

export type BridgeConnectionState =
  | "disconnected"
  | "listening"
  | "connected"
  | "error";

export type BridgeHandshakeRequest = {
  type: "bridge.handshake";
  protocolVersion: typeof HANDSHAKE_PROTOCOL_VERSION;
  clientName: typeof HANDSHAKE_CLIENT_NAME;
  sentAt: string;
};

export type BridgeHandshakeResponse = {
  type: "bridge.handshake.response";
  ok: true;
  protocolVersion: typeof HANDSHAKE_PROTOCOL_VERSION;
  serverName: typeof HANDSHAKE_SERVER_NAME;
  receivedAt: string;
};
