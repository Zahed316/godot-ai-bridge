export const PROJECT_NAME = "godot-ai-bridge" as const;
export const PROTOCOL_VERSION = "phase-6a" as const;

export type PhaseName =
  | "phase-0"
  | "phase-1"
  | "phase-2a"
  | "phase-2b"
  | "phase-3"
  | "phase-4"
  | "phase-5"
  | "phase-6a";

export const CURRENT_PHASE: PhaseName = "phase-6a";

export const BRIDGE_STATUS_TOOL = "bridge.status" as const;
export const BRIDGE_GET_CAPABILITIES_TOOL = "bridge.get_capabilities" as const;
export const PROJECT_GET_INFO_TOOL = "project.get_info" as const;
export const PROJECT_GET_FILESYSTEM_TREE_TOOL = "project.get_filesystem_tree" as const;
export const SCENE_GET_TREE_TOOL = "scene.get_tree" as const;

export const BRIDGE_TOOL_NAMES = [
  BRIDGE_STATUS_TOOL,
  BRIDGE_GET_CAPABILITIES_TOOL,
  PROJECT_GET_INFO_TOOL,
  PROJECT_GET_FILESYSTEM_TREE_TOOL,
  SCENE_GET_TREE_TOOL,
] as const;

export type BridgeToolName = (typeof BRIDGE_TOOL_NAMES)[number];

export const READ_ONLY_BRIDGE_METHODS = [
  PROJECT_GET_INFO_TOOL,
  PROJECT_GET_FILESYSTEM_TREE_TOOL,
  SCENE_GET_TREE_TOOL,
] as const;

export type BridgeMethodName = (typeof READ_ONLY_BRIDGE_METHODS)[number];
export type ReadOnlyBridgeMethod = BridgeMethodName;
export type BridgeRequestId = string;

export const WEBSOCKET_HOST = "127.0.0.1" as const;
export const WEBSOCKET_PORT = 6505 as const;
export const WEBSOCKET_PATH = "/godot-ai-bridge" as const;
export const HANDSHAKE_PROTOCOL_VERSION = "phase-6a-handshake" as const;
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

export const BRIDGE_ERROR_CODES = [
  "BRIDGE_NOT_CONNECTED",
  "METHOD_NOT_FOUND",
  "INVALID_PARAMS",
  "PATH_NOT_ALLOWED",
  "OPERATION_DENIED",
  "TIMEOUT",
  "INTERNAL_ERROR",
] as const;

export type BridgeErrorCode = (typeof BRIDGE_ERROR_CODES)[number];

export type BridgeError = {
  code: BridgeErrorCode;
  message: string;
  details: Record<string, unknown>;
  suggestions: string[];
};

export type BridgeErrorResponse = {
  ok: false;
  error: BridgeError;
};

export function createBridgeError(
  code: BridgeErrorCode,
  message: string,
  options: {
    details?: Record<string, unknown>;
    suggestions?: string[];
  } = {},
): BridgeError {
  return {
    code,
    message,
    details: options.details ?? {},
    suggestions: options.suggestions ?? [],
  };
}

export function createBridgeErrorResponse(
  code: BridgeErrorCode,
  message: string,
  options: {
    details?: Record<string, unknown>;
    suggestions?: string[];
  } = {},
): BridgeErrorResponse {
  return {
    ok: false,
    error: createBridgeError(code, message, options),
  };
}

export type BridgeRequestEnvelope = {
  type: "bridge.request";
  id: BridgeRequestId;
  method: BridgeMethodName;
  params: Record<string, never>;
};

export type BridgeReadOnlyRequest = BridgeRequestEnvelope;

export type BridgeResponseEnvelope = {
  type: "bridge.response";
  id: BridgeRequestId;
  result: Record<string, unknown> | BridgeErrorResponse;
};

export type BridgeReadOnlyResponse = BridgeResponseEnvelope;

export type BridgeHeartbeatMessage = {
  type: "bridge.heartbeat";
  sentAt: string;
  connectionState: BridgeConnectionState;
  reconnectAttemptCount: number;
};

export const READ_ONLY_PATH_ALLOWED_ROOTS = ["res://", "user://"] as const;
export const READ_ONLY_PATH_BLOCKED_PATTERNS = [
  "../",
  ".git",
  ".godot",
  ".import",
  "node_modules",
  "dist",
] as const;

export function isReadOnlyPathAllowed(path: string): boolean {
  const hasAllowedRoot = READ_ONLY_PATH_ALLOWED_ROOTS.some((root) => path.startsWith(root));
  if (!hasAllowedRoot) {
    return false;
  }

  return !READ_ONLY_PATH_BLOCKED_PATTERNS.some((pattern) => path.includes(pattern));
}
