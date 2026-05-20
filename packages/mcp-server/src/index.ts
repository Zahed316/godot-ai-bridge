#!/usr/bin/env node

import { fileURLToPath } from "node:url";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as z from "zod/v4";

import {
  BRIDGE_GET_CAPABILITIES_TOOL,
  BRIDGE_STATUS_TOOL,
  BRIDGE_TOOL_NAMES,
  CURRENT_PHASE,
  PROJECT_NAME,
  PROJECT_GET_FILESYSTEM_TREE_TOOL,
  PROJECT_GET_INFO_TOOL,
  PROTOCOL_VERSION,
  SCENE_GET_TREE_TOOL,
  WEBSOCKET_HOST,
  WEBSOCKET_PORT,
} from "@godot-ai-bridge/protocol";

import {
  getLocalWebSocketBridgeStatus,
  sendReadOnlyBridgeRequest,
  startLocalWebSocketServer,
} from "./bridge/localWebSocketServer.js";

const TOOL_COUNT = BRIDGE_TOOL_NAMES.length;
const NOT_IMPLEMENTED_NOTE =
  "Phase 6A keeps the bridge read-only while adding shared protocol, error, heartbeat, and path guard foundations. Command execution and write tools are disabled.";

const statusOutputSchema = {
  ok: z.literal(true),
  projectName: z.string(),
  protocolVersion: z.string(),
  phase: z.string(),
  websocketListening: z.boolean(),
  websocketHost: z.literal(WEBSOCKET_HOST),
  websocketPort: z.literal(WEBSOCKET_PORT),
  godotConnected: z.boolean(),
  lastHandshakeAt: z.string().nullable(),
  lastHeartbeatAt: z.string().nullable(),
  reconnectAttemptCount: z.number().int().nonnegative(),
  capabilitiesCount: z.number().int().nonnegative(),
  note: z.string(),
};

const capabilitiesOutputSchema = {
  ok: z.literal(true),
  tools: z.array(
    z.object({
      name: z.enum(BRIDGE_TOOL_NAMES),
      description: z.string(),
      readOnly: z.literal(true),
    }),
  ),
};

const bridgeErrorShape = z
  .object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.string(), z.unknown()),
    suggestions: z.array(z.string()),
  })
  .optional();

const projectInfoOutputSchema = {
  ok: z.boolean(),
  projectName: z.string().optional(),
  godotVersion: z.string().nullable().optional(),
  projectPath: z.string().nullable().optional(),
  pluginPhase: z.string().optional(),
  bridgeStatus: z.string().optional(),
  error: bridgeErrorShape,
};

const filesystemTreeOutputSchema = {
  ok: z.boolean(),
  root: z.literal("res://").optional(),
  maxDepth: z.number().int().nonnegative().optional(),
  children: z.array(z.unknown()).optional(),
  error: bridgeErrorShape,
};

const sceneTreeOutputSchema = {
  ok: z.boolean(),
  currentScenePath: z.string().nullable().optional(),
  message: z.string().optional(),
  root: z.unknown().nullable().optional(),
  error: bridgeErrorShape,
};

const capabilities = [
  {
    name: BRIDGE_STATUS_TOOL,
    description: "Reports bridge package status without connecting to Godot.",
    readOnly: true,
  },
  {
    name: BRIDGE_GET_CAPABILITIES_TOOL,
    description: "Lists the currently exposed safe bridge tools.",
    readOnly: true,
  },
  {
    name: PROJECT_GET_INFO_TOOL,
    description: "Reads basic Godot project metadata through the local bridge.",
    readOnly: true,
  },
  {
    name: PROJECT_GET_FILESYSTEM_TREE_TOOL,
    description: "Reads a shallow project filesystem tree through the local bridge.",
    readOnly: true,
  },
  {
    name: SCENE_GET_TREE_TOOL,
    description: "Reads the open editor scene tree through the local bridge.",
    readOnly: true,
  },
] as const;

function toolResult(structuredContent: Record<string, unknown>): {
  structuredContent: Record<string, unknown>;
  content: Array<{ type: "text"; text: string }>;
} {
  return {
    structuredContent,
    content: [
      {
        type: "text",
        text: JSON.stringify(structuredContent),
      },
    ],
  };
}

export function createServer(): McpServer {
  const server = new McpServer({
    name: PROJECT_NAME,
    version: PROTOCOL_VERSION,
  });

  server.registerTool(
    BRIDGE_STATUS_TOOL,
    {
      title: "Bridge Status",
      description: "Return current bridge status without connecting to Godot.",
      inputSchema: {},
      outputSchema: statusOutputSchema,
      annotations: {
        readOnlyHint: true,
      },
    },
    async () => {
      const bridgeStatus = getLocalWebSocketBridgeStatus();
      const structuredContent = {
        ok: true,
        projectName: PROJECT_NAME,
        protocolVersion: PROTOCOL_VERSION,
        phase: CURRENT_PHASE,
        websocketListening: bridgeStatus.websocketListening,
        websocketHost: bridgeStatus.websocketHost,
        websocketPort: bridgeStatus.websocketPort,
        godotConnected: bridgeStatus.godotConnected,
        lastHandshakeAt: bridgeStatus.lastHandshakeAt,
        lastHeartbeatAt: bridgeStatus.lastHeartbeatAt,
        reconnectAttemptCount: bridgeStatus.reconnectAttemptCount,
        capabilitiesCount: TOOL_COUNT,
        note: NOT_IMPLEMENTED_NOTE,
      };

      return toolResult(structuredContent);
    },
  );

  server.registerTool(
    BRIDGE_GET_CAPABILITIES_TOOL,
    {
      title: "Bridge Capabilities",
      description: "List the safe bridge tools available in this phase.",
      inputSchema: {},
      outputSchema: capabilitiesOutputSchema,
      annotations: {
        readOnlyHint: true,
      },
    },
    async () => {
      const structuredContent = {
        ok: true,
        tools: capabilities,
      };

      return toolResult(structuredContent);
    },
  );

  server.registerTool(
    PROJECT_GET_INFO_TOOL,
    {
      title: "Project Info",
      description: "Read basic Godot project metadata.",
      inputSchema: {},
      outputSchema: projectInfoOutputSchema,
      annotations: {
        readOnlyHint: true,
      },
    },
    async () => {
      const structuredContent = await sendReadOnlyBridgeRequest(PROJECT_GET_INFO_TOOL);
      return toolResult(structuredContent);
    },
  );

  server.registerTool(
    PROJECT_GET_FILESYSTEM_TREE_TOOL,
    {
      title: "Project Filesystem Tree",
      description: "Read a shallow Godot project filesystem tree.",
      inputSchema: {},
      outputSchema: filesystemTreeOutputSchema,
      annotations: {
        readOnlyHint: true,
      },
    },
    async () => {
      const structuredContent = await sendReadOnlyBridgeRequest(PROJECT_GET_FILESYSTEM_TREE_TOOL);
      return toolResult(structuredContent);
    },
  );

  server.registerTool(
    SCENE_GET_TREE_TOOL,
    {
      title: "Scene Tree",
      description: "Read the currently open Godot editor scene tree.",
      inputSchema: {},
      outputSchema: sceneTreeOutputSchema,
      annotations: {
        readOnlyHint: true,
      },
    },
    async () => {
      const structuredContent = await sendReadOnlyBridgeRequest(SCENE_GET_TREE_TOOL);
      return toolResult(structuredContent);
    },
  );

  return server;
}

export async function main(): Promise<void> {
  startLocalWebSocketServer();
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

const entrypoint = fileURLToPath(import.meta.url);
if (process.argv[1] === entrypoint) {
  main().catch((error: unknown) => {
    console.error("[godot-ai-bridge] MCP server failed", error);
    process.exit(1);
  });
}
