# Architecture

Planned components:

- TypeScript MCP server
- Shared protocol package
- Godot Editor Plugin
- Local WebSocket JSON-RPC bridge
- Future `plan` / `preview` / `apply` workflow

The intended flow is:

1. An AI client talks to the MCP server over stdio.
2. The MCP server translates tool requests into bridge messages.
3. The bridge exchanges JSON-RPC over a localhost-only WebSocket.
4. The Godot Editor Plugin receives requests and executes approved editor-safe actions.

ASCII overview:

```text
AI Client
  |
  | MCP stdio
  v
MCP Server (TypeScript)
  |
  | shared protocol
  v
Local WebSocket JSON-RPC Bridge
  |
  | localhost only
  v
Godot Editor Plugin
```

The future workflow is planned to support:

- `plan`: inspect and describe intended changes
- `preview`: surface proposed actions before execution
- `apply`: execute only after approval and validation

This repository only prepares the structure for that system. No bridge logic is implemented yet.

