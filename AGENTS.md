# Agent Rules

AI coding agents working in this repository must follow these rules:

- Work phase by phase.
- Do not implement unrequested phases.
- Prefer small, focused changes.
- Run checks after edits when a check is available.
- End every future implementation phase with a local git commit and a remote push before moving on.
- Preserve the clean-room rules in `docs/CLEAN_ROOM.md`.
- Never add dangerous tools without explicit approval.
- Do not expose network services beyond localhost.

Agents should keep changes tightly scoped, avoid speculative implementation, and stop at the current phase boundary.
