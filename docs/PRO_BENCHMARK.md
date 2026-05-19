# Pro Benchmark

`youichi-uda/godot-mcp-pro` is useful as a product benchmark, not as a server implementation source.

## License Distinction

- Public plugin: `addons/godot_mcp/` is MIT licensed and may be reused with attribution.
- Paid server: the TypeScript MCP server is proprietary and must not be copied or reconstructed from private materials.
- README/tool catalog: usable for competitive benchmarking, prioritization, and roadmap planning.

## Architecture Comparison

`godot-mcp-pro` describes an AI client connected to a Node.js MCP server over stdio, with a WebSocket bridge to a Godot editor plugin.

`godot-ai-bridge` follows the same broad transport shape, but with stricter defaults:

- localhost-only WebSocket transport
- small MCP tool surface
- phase-by-phase tool adoption
- no command execution by default
- no editor mutation until transaction and approval phases
- explicit clean-room and license rules

## Tool Category Comparison

Useful benchmark categories:

- project
- scene
- node
- script
- editor
- input
- runtime
- animation
- TileMap
- UI/theme
- profiling
- batch/refactor
- shader
- export
- resource
- physics
- 3D
- particles
- navigation
- audio
- testing/QA

`godot-ai-bridge` should not expose these categories all at once. The roadmap should start with read-only project, filesystem, scene, and editor output capabilities.

## What We Adopt Now

- Architecture target: MCP stdio server to localhost WebSocket to Godot editor plugin
- Status and handshake visibility
- Category-based roadmap planning
- Progressive disclosure as a core design constraint

## What We Defer

- write tools
- runtime inspection
- input simulation
- screenshot capture
- export helpers
- TileMap and 2D workflow helpers
- QA scenario tools

## What We Redesign

- command envelopes
- structured errors with safe suggestions
- heartbeat and reconnect
- port fallback
- path guards
- transaction and snapshot workflow
- editor output retrieval

## What We Explicitly Avoid

- proprietary TypeScript server code
- arbitrary GDScript execution
- external command execution
- hidden editor automation
- unsafe autoload injection
- scene/resource deletion without snapshot and approval
- broad tool catalogs before trust boundaries are reviewed
