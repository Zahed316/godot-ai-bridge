#!/usr/bin/env node

import { fileURLToPath } from "node:url";

export function main(): void {
  console.error("[godot-ai-bridge] Phase 2A MCP server foundation only");
  console.error("[godot-ai-bridge] No MCP tools, sockets, or Godot bridge yet");
}

const entrypoint = fileURLToPath(import.meta.url);
if (process.argv[1] === entrypoint) {
  main();
}
