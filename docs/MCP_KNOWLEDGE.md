# MCP Knowledge

MCP is the external interface between AI clients and tools.

Planned architecture:

`Cursor` / `Claude` / `Codex` / `Cline` -> MCP stdio server -> localhost WebSocket -> Godot Editor Plugin

Planned MCP primitives:

- Tools
- Resources
- Prompts

Planned tool groups:

- bridge
- project
- scene
- node
- script
- editor
- runtime
- input
- qa
- twod
- plan

Dynamic tool discovery is preferred because it keeps the exposed surface smaller, easier to review, and easier to secure than publishing too many tools at once.

Write tools must eventually follow:

`dry_run -> preview -> apply`

## Official MCP Areas to Respect

Future MCP work must use the compact official MCP index in `docs/MCP_API_INDEX.md`.
Pay special attention to stdio transport rules, tool schemas, structured output, error behavior, and progressive tool discovery.
