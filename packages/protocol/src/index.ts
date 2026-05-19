export const PROJECT_NAME = "godot-ai-bridge" as const;
export const PROTOCOL_VERSION = "phase-2b" as const;

export type PhaseName = "phase-0" | "phase-1" | "phase-2a" | "phase-2b";

export const CURRENT_PHASE: PhaseName = "phase-2b";

export const BRIDGE_STATUS_TOOL = "bridge.status" as const;
export const BRIDGE_GET_CAPABILITIES_TOOL = "bridge.get_capabilities" as const;

export const BRIDGE_TOOL_NAMES = [
  BRIDGE_STATUS_TOOL,
  BRIDGE_GET_CAPABILITIES_TOOL,
] as const;

export type BridgeToolName = (typeof BRIDGE_TOOL_NAMES)[number];
