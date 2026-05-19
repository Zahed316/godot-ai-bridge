# ADR 0003: Pro Benchmark Roadmap

## Status

Accepted.

## Context

`youichi-uda/godot-mcp-pro` is a useful benchmark for Godot MCP product scope. Its public repository includes an MIT license for the Godot editor plugin under `addons/godot_mcp/`. Its TypeScript MCP server is distributed separately under a proprietary license in the paid package.

## Decision

Use the public MIT-licensed plugin portion of `godot-mcp-pro` as an optional open-source reference with attribution, and use the rest of the project as a product benchmark only.

Do not copy or depend on the proprietary TypeScript server.

Keep `godot-ai-bridge` open source and license-auditable.

Prefer safer original implementations.

Adopt Pro-like feature categories only through the phased roadmap.

## Consequences

- Direct MIT reuse requires attribution in `THIRD_PARTY_NOTICES.md`.
- Proprietary server materials are excluded from implementation work.
- Pro-like tool categories can influence planning but not bypass security review.
- Future feature work remains phase-scoped and default-deny.
