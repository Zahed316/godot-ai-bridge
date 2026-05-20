# Feature Roadmap

This roadmap borrows product categories from Godot MCP Pro as a benchmark while keeping `godot-ai-bridge` safer and more incremental.

## Phase 5

- `project.get_info`
- `project.get_filesystem_tree`
- `scene.get_tree`
- `editor.get_errors` or `editor.get_output_log` if feasible

## Phase 6A

- shared internal read-only bridge envelope
- structured errors
- heartbeat/reconnect
- path guard read-only

## Phase 6B

- transaction foundation
- snapshots

## Phase 7

- first safe write tool with `dry_run` only

## Phase 8

- preview/apply workflow

## Phase 9

- 2D workflow helpers

## Later

- input simulation
- runtime inspection
- screenshots
- TileMap helpers
- QA scenarios
- export helpers
- refactor tools
