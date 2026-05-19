# godot-ai-bridge

`godot-ai-bridge` is a clean-room open-source project for connecting AI coding agents to Godot 4 through a local, security-conscious bridge.

Target architecture:

`Cursor` / `Claude` / `Codex` / `Cline` -> MCP stdio server -> localhost WebSocket -> Godot Editor Plugin

Phase 1 is bootstrap only. This repository currently defines the structure, documentation, and agent rules only. It does not yet implement the MCP server, the WebSocket bridge, or any Godot automation logic.

Persian README:

- [README.fa.md](README.fa.md)
