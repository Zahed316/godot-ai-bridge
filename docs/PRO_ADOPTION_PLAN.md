# Pro Adoption Plan

`youichi-uda/godot-mcp-pro` is a partly open benchmark for this project. The public Godot addon/plugin is MIT licensed. The TypeScript MCP server is proprietary and must not be reused.

## Reusable Under MIT

Public addon/plugin concepts that may be reused or adapted with attribution:

- EditorPlugin lifecycle pattern
- status panel pattern
- command category organization idea
- plugin cleanup pattern
- UI integration through bottom panel
- optional service-node organization

Do not copy code yet. If direct MIT reuse becomes valuable, document it in `THIRD_PARTY_NOTICES.md`.

## Inspiration Only

Concepts that should inspire our design but be implemented independently:

- mode-based tool exposure
- CLI/help-based discovery
- JSON-RPC-style internal bridge
- structured error suggestions
- heartbeat and reconnect
- port scanning or port fallback
- tool category roadmap
- runtime/input/QA categories

## Must Not Reuse

- paid TypeScript MCP server code
- private package implementation
- proprietary setup scripts
- any code not present in the public MIT-licensed repo
- arbitrary script execution patterns without redesign
- risky editor automation without Security Agent review

## Redesign Before Adoption

Features that need safer redesign:

- autoload injection
- temp file communication
- auto-dismiss editor dialogs
- debugger continue automation
- arbitrary editor script execution
- runtime mutation
- scene/resource deletion
- external command execution

## Fast-Track Opportunities

1. Read-only project inspection
2. Read-only scene tree inspection
3. Editor output/error retrieval
4. Filesystem tree read-only
5. Tool modes
6. CLI discovery
7. Structured error suggestions
8. Heartbeat/reconnect
9. Screenshot capture
10. Transaction foundation
