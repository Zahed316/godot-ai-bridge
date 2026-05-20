# Risk Register

## License And Open Source Risks

| Risk | Mitigation |
| --- | --- |
| License ambiguity | Treat the license file as authoritative and document third-party use. |
| Copying proprietary server behavior | Do not use paid TypeScript MCP server code or private package materials. |
| Missing attribution | Record direct MIT reuse in `THIRD_PARTY_NOTICES.md`. |
| Mixing MIT plugin code with original code without notices | Prefer original implementation; preserve notices for copied MIT material. |
| Overusing Pro design without safety redesign | Use Pro as benchmark only; route adoption through phased guardrails. |

## Technical Risks

| Risk | Mitigation |
| --- | --- |
| Too many tools exposed | Prefer progressive disclosure and phase-scoped tool groups. |
| Unsafe command routing | Keep command envelopes typed, reviewed, and default-deny. |
| Arbitrary GDScript execution | Forbidden by default; require explicit Security Agent review before any future design. |
| Autoload injection | Redesign with approval, rollback, and user visibility before adoption. |
| Temp files | Avoid unless path-guarded, scoped, and cleaned deterministically. |
| Editor dialog automation | Avoid hidden UI automation; require explicit user approval. |
| Runtime mutation | Defer until runtime inspection and write safety are separately reviewed. |
| Scene deletion | Require snapshot, approval, and undo-aware workflow. |
| Network exposure | Bind only to `127.0.0.1`; never bind to `0.0.0.0`. |

## Compatibility Tool Risks

| Risk | Severity | Mitigation | Responsible agent | Earliest allowed phase |
| --- | --- | --- | --- | --- |
| External process launch through `editor.launch` | High | Keep process execution disabled by default; require explicit approval and full-dev mode. | Security Agent | Later, after explicit approval |
| Project run/stop through runtime tools | High | Defer until runtime and QA boundaries exist; isolate from editor read/write tools. | Architecture Agent | qa-runtime phase |
| Scene save through `scene.save` | High | Require snapshot, approval, transaction apply, and rollback planning. | Godot Plugin Agent | After Phase 8 apply |
| UID updates or resource resaves | High | Treat as risky write; require project-scoped paths, snapshot, and strong approval. | Security Agent | Later after snapshot/apply |
| Compatibility aliases bypassing safety | High | Keep aliases disabled by default; wrappers must map to one canonical dot-notation tool and reuse policy checks. | Architecture Agent | Explicit compatibility phase |
| Arbitrary filesystem project discovery | Medium | Limit `workspace.list_projects` to configured safe roots; deny traversal and global scans. | Security Agent | Later full-dev phase |
| Export operations such as mesh library export | Medium | Defer until full-dev/export phase; require path guard, preview, and approval. | Architecture Agent | Advanced/export phase |
