# Godot Knowledge

Godot 4 uses an `@tool` `EditorPlugin` for editor-time integration.

Key points:

- The plugin must be a `@tool` script.
- `EditorPlugin` is the editor-facing entry point.
- Plugin logic should stay minimal at first so the bootstrap phase remains safe and easy to review.
- The plugin should not grow into a catch-all runtime layer.

Planned future responsibilities:

- status panel
- local WebSocket gateway
- command router
- editor API services
- screenshot service
- runtime probe
- transaction manager

Do not use arbitrary editor script execution by default.

