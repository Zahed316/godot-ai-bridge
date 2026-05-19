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
