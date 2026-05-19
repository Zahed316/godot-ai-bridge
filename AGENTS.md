# Agent Rules

AI coding agents working in this repository must follow these rules:

- Use minimum tokens.
- Agents must read `docs/DEVELOPMENT.md`.
- Agents must read `docs/QUALITY_GATES.md`.
- Agents must follow `docs/SCHEMA_CONVENTIONS.md` before adding any tool.
- Agents must follow `docs/ERROR_MODEL.md` before defining any error response.
- Agents must not add CI deployment.
- Agents must not add real Godot/MCP behavior in this phase.
- Read `docs/AGENT_ROLES.md` before making changes.
- Read `docs/API_BOUNDARIES.md` before implementing any tool.
- Work phase by phase.
- Do not implement unrequested phases.
- Prefer small, focused changes.
- Run checks after edits when a check is available.
- End every future implementation phase with a local git commit and a remote push before moving on.
- Do not implement a future phase unless explicitly requested.
- Name which role you are acting as in your final report.
- If agents are used, only one agent may be active at a time.
- Wait for each agent result before activating another agent.
- Agents must run available checks.
- Agents must commit and push after accepted changes, following the required Git workflow.
- Preserve the clean-room rules in `docs/CLEAN_ROOM.md`.
- Never add dangerous tools without explicit approval.
- Do not expose network services beyond localhost.

Agents should keep changes tightly scoped, avoid speculative implementation, and stop at the current phase boundary.

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
