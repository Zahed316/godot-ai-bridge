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
  PROTOCOL_VERSION,
} from "@godot-ai-bridge/protocol";

const TOOL_COUNT = BRIDGE_TOOL_NAMES.length;
const NOT_IMPLEMENTED_NOTE =
  "Godot and WebSocket bridge integration are not implemented in Phase 2B.";

const statusOutputSchema = {
  ok: z.literal(true),
  projectName: z.string(),
  protocolVersion: z.string(),
  phase: z.string(),
  godotConnected: z.literal(false),
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
] as const;

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
      const structuredContent = {
        ok: true,
        projectName: PROJECT_NAME,
        protocolVersion: PROTOCOL_VERSION,
        phase: CURRENT_PHASE,
        godotConnected: false,
        capabilitiesCount: TOOL_COUNT,
        note: NOT_IMPLEMENTED_NOTE,
      };

      return {
        structuredContent,
        content: [
          {
            type: "text",
            text: JSON.stringify(structuredContent),
          },
        ],
      };
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

      return {
        structuredContent,
        content: [
          {
            type: "text",
            text: JSON.stringify(structuredContent),
          },
        ],
      };
    },
  );

  return server;
}

export async function main(): Promise<void> {
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
