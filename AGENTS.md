# Agent Rules

AI coding agents working in this repository must follow these rules:

- Use minimum tokens.
- Agents must read `docs/DEVELOPMENT.md`.
- Agents must read `docs/QUALITY_GATES.md`.
- Agents must read `docs/NEXT_PHASES.md` and confirm the requested work belongs to the current or explicitly requested phase.
- Agents must read `docs/AGENT_ROLES.md` before making changes and name the active role in the final report.
- Agents must read `docs/API_BOUNDARIES.md` before implementing or changing any tool, bridge, editor, filesystem, scene, or network behavior.
- Agents must read `docs/IMPLEMENTATION_GUARDRAILS.md` before implementation work.
- Agents must consult `docs/OFFICIAL_REFERENCES.md`, `docs/GODOT_API_INDEX.md`, and `docs/MCP_API_INDEX.md` when working near Godot or MCP APIs.
- Agents must follow `docs/SCHEMA_CONVENTIONS.md` before adding any tool.
- Agents must follow `docs/ERROR_MODEL.md` before defining any error response.
- Agents must preserve the clean-room rules in `docs/CLEAN_ROOM.md`.
- Agents must not add CI deployment.
- Work phase by phase.
- Do not implement unrequested phases.
- Prefer small, focused changes.
- Run checks after edits when a check is available.
- End every future implementation phase with a local git commit and a remote push before moving on.
- Do not implement a future phase unless explicitly requested.
- If agents are used, only one agent may be active at a time.
- Wait for each agent result before activating another agent.
- Agents must run available checks.
- Agents must commit and push after accepted changes, following the required Git workflow.
- Never add dangerous tools without explicit approval.
- Do not expose network services beyond localhost.

Agents should keep changes tightly scoped, avoid speculative implementation, and stop at the current phase boundary.

## Current Project State

- Phase 2B is complete.
- The repository has a minimal TypeScript MCP stdio server in `packages/mcp-server`.
- The MCP server currently exposes exactly two safe read-only tools: `bridge.status` and `bridge.get_capabilities`.
- Shared constants and tool names live in `packages/protocol`.
- The Godot addon is still a bootstrap `EditorPlugin`; no status panel phase work has been implemented yet.
- No WebSocket bridge, Godot command router, runtime inspection, scene tools, write tools, or JSON-RPC-to-Godot behavior exists yet.
- Official API reference indexes and implementation guardrails live under `docs/`.

## Repository Map

- `packages/mcp-server/**`: TypeScript MCP stdio server.
- `packages/protocol/**`: shared project/protocol constants and future contracts.
- `addons/godot_ai_bridge/**`: Godot Editor Plugin files.
- `docs/**`: architecture, phase, role, security, official-reference, and quality documentation.
- `tests/**`: placeholder test layout for future phases.
- `.github/workflows/**`: checks-only CI. Do not add deployment.

## Development Workflow

- Use `pnpm@10.25.0` through Corepack.
- Keep stdout reserved for MCP protocol messages; logs go to stderr.
- Prefer progressive tool discovery over large tool catalogs.
- All tools must be schema-driven and phase-approved.
- Future write tools must start with `dry_run`; destructive operations require snapshot and approval.
- Security-sensitive tools require Security Agent review.

Available root checks:

- `pnpm typecheck`
- `pnpm build`
- `pnpm lint`
- `pnpm test`

## Required Git Workflow

After every completed implementation prompt or project phase, agents must keep both the offline local repository and the GitHub repository synchronized.

Required sequence:

1. Run the available checks for the changed scope.
2. Run `git status`.
3. Run `git add -A`.
4. Run `git commit -m "<clear conventional commit message>"`.
5. Run `git push`.

If there are no changes to commit, explicitly report that the working tree is clean.
If checks cannot run because a dependency is missing, report the exact missing dependency before committing.
Do not skip the local commit and remote push after an accepted change.

## Final Report Contract

Every final report must include:

- Active role
- Changed files
- Checks run or skipped
- Confirmation of forbidden changes not made
- Latest commit hash and message
- Working tree status
- Next suggested phase or blocker
