# Godot API Index

This file is an index, not a copy of official documentation.

## EditorPlugin

- Purpose: Editor extension entry point.
- Expected use in this project: Add a minimal status panel, own plugin lifecycle, and later expose named editor services.
- Allowed phase: Phase 3+.
- Risks: Overgrown plugin scripts, unsafe editor-time execution, accidental scene mutation.
- Forbidden use: Catch-all command router or arbitrary script executor.

## EditorInterface

- Purpose: Access editor state, edited scene, selection, resources, and editor UI.
- Expected use in this project: Read editor state and route approved editor operations through named services.
- Allowed phase: Phase 3+.
- Risks: Broad editor control can save, close, edit, or inspect more than intended.
- Forbidden use: Unscoped editor mutation or hidden UI automation.

## EditorUndoRedoManager

- Purpose: Integrate changes with Godot editor undo history.
- Expected use in this project: Required for future safe write tools and transaction apply steps.
- Allowed phase: Phase 6+.
- Risks: Wrong history context, unsaved scene state, irreversible edits if bypassed.
- Forbidden use: Destructive scene/resource changes outside undo/snapshot workflow.

## ProjectSettings

- Purpose: Read and manage project-level settings.
- Expected use in this project: Read project name/metadata and later approved settings updates.
- Allowed phase: Phase 5+ for reads; Phase 7+ for writes.
- Risks: Project-wide persistent changes.
- Forbidden use: Silent settings mutation or security weakening.

## Node

- Purpose: Base scene object and hierarchy building block.
- Expected use in this project: Read scene trees, inspect names/types/paths, and later apply safe node edits.
- Allowed phase: Phase 5+ for reads; Phase 7+ for writes.
- Risks: Freeing, reparenting, or mutating nodes can corrupt scenes.
- Forbidden use: Arbitrary method calls or deletion without snapshot and approval.

## SceneTree

- Purpose: Manage active node hierarchy, current scene, groups, and scene loop.
- Expected use in this project: Read current scene state and group membership.
- Allowed phase: Phase 5+.
- Risks: Scene switching/reloading can discard user work.
- Forbidden use: Scene reload/change/quit operations without explicit approval.

## PackedScene

- Purpose: Serialized scene resource.
- Expected use in this project: Inspect saved scenes and later support transaction-backed scene writes.
- Allowed phase: Phase 5+ for reads; Phase 7+ for dry-run writes.
- Risks: Packing/saving can omit unowned nodes or overwrite scene files.
- Forbidden use: Direct save/apply without dry-run, preview, snapshot, and approval.

## Resource

- Purpose: Base class for Godot data assets.
- Expected use in this project: Read resource metadata and support future resource-aware operations.
- Allowed phase: Phase 5+ for reads; Phase 7+ for writes.
- Risks: Cached resources and shared references can make mutations wider than expected.
- Forbidden use: Mutating shared resources without explicit transaction context.

## FileAccess

- Purpose: File read/write API.
- Expected use in this project: Future project-scoped reads and transaction-controlled writes.
- Allowed phase: Phase 5+ for reads; Phase 7+ for dry-run writes.
- Risks: Can access persistent filesystem data.
- Forbidden use: Access outside allowed project paths or writes without path guard.

## DirAccess

- Purpose: Directory listing and directory mutation API.
- Expected use in this project: Future project-scoped file discovery.
- Allowed phase: Phase 5+ for reads; Phase 7+ for writes.
- Risks: Can traverse or modify filesystem directories.
- Forbidden use: Traversal outside project root or directory deletion without approval.

## WebSocketPeer

- Purpose: Godot WebSocket connection peer.
- Expected use in this project: Candidate for local bridge connection to the MCP server side.
- Allowed phase: Phase 4.
- Risks: Network exposure, unauthenticated commands, message framing bugs.
- Forbidden use: Binding or connecting beyond localhost, or executing commands before command-router phase.

## Script and @GDScript

- Purpose: Script resources, annotations, source code, and reload behavior.
- Expected use in this project: Future syntax validation and script metadata inspection.
- Allowed phase: Phase 7+ only when explicitly requested.
- Risks: Reloading or running tool scripts can execute editor-time code.
- Forbidden use: Arbitrary GDScript execution by default.

## Viewport and ViewportTexture

- Purpose: Viewport rendering and texture access.
- Expected use in this project: Future screenshot or editor viewport capture service.
- Allowed phase: Phase 5+ for read-only capture planning.
- Risks: Performance cost and accidental capture of sensitive editor state.
- Forbidden use: Continuous capture or exfiltration without explicit user request.
