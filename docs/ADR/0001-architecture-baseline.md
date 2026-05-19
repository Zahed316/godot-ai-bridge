# Title

Architecture Baseline

# Status

Accepted

# Context

The project needs a small, local-first bridge for Godot 4 and AI clients.

# Decision

Use a TypeScript MCP stdio server plus a localhost-only Godot Editor Plugin bridge.

Do not expose network services beyond `127.0.0.1`.

Do not implement arbitrary script execution by default.

# Consequences

- The surface stays local and reviewable.
- Implementation can remain phased.
- Risky capabilities stay out of the default path.

