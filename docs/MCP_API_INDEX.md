# MCP API Index

This file is an index, not a copy of official documentation.

## MCP Server

- Purpose: Provides context and capabilities to MCP clients.
- Expected use in this project: TypeScript server exposes tightly scoped Godot bridge tools.
- Allowed phase: Phase 2B+.
- Risks: Too many capabilities, unclear trust boundaries.
- Guardrails: Keep server focused, minimal, and phase-scoped.

## stdio Transport

- Purpose: Local process transport over stdin/stdout.
- Expected use in this project: Default MCP transport before any local bridge transport exists.
- Allowed phase: Phase 2B+.
- Risks: Any non-protocol stdout breaks clients.
- Guardrails: Reserve stdout for MCP JSON-RPC; send logs to stderr only.

## Tools

- Purpose: Callable model-controlled functions exposed by the server.
- Expected use in this project: Start with bridge status/capability tools, then add phase-approved tools only.
- Allowed phase: Phase 2B+.
- Risks: Unsafe actions, prompt injection, hidden side effects.
- Guardrails: Short descriptions, schemas, read/write risk review, and Security Agent review for sensitive tools.

## Resources

- Purpose: Context data sources discoverable by clients.
- Expected use in this project: Possible future read-only project metadata or docs resources.
- Allowed phase: Future explicit phase only.
- Risks: Leaking project files or sensitive data.
- Guardrails: Validate URIs, enforce path guard, and expose minimal resource sets.

## Prompts

- Purpose: User-controlled reusable prompt templates.
- Expected use in this project: Possible future guided workflows.
- Allowed phase: Future explicit phase only.
- Risks: Prompt injection or misleading automation.
- Guardrails: Validate arguments, keep prompts transparent, and avoid hidden tool encouragement.

## Input Schema

- Purpose: Defines valid tool arguments.
- Expected use in this project: Every tool must define narrow schemas.
- Allowed phase: Phase 2B+.
- Risks: Loose schemas allow unexpected behavior.
- Guardrails: Prefer explicit object shapes, enums, and conservative defaults.

## Structured Output

- Purpose: Machine-readable tool result data.
- Expected use in this project: Tool outputs should return stable structured data for clients.
- Allowed phase: Phase 2B+.
- Risks: Schema drift or ambiguous result shape.
- Guardrails: Pair structured content with output schemas where supported.

## Error Model

- Purpose: Standard failure reporting.
- Expected use in this project: Align future errors with `docs/ERROR_MODEL.md`.
- Allowed phase: Phase 2B+ for planning; runtime errors only when phase requests.
- Risks: Leaking internals or inconsistent retry guidance.
- Guardrails: Use stable codes, human-readable messages, and safe suggestions.

## Tool Descriptions

- Purpose: Help clients and models understand tool intent.
- Expected use in this project: Concise, factual descriptions for each exposed tool.
- Allowed phase: Phase 2B+.
- Risks: Overbroad or manipulative descriptions can cause unsafe tool choice.
- Guardrails: Keep descriptions short, non-manipulative, and risk-accurate.

## Progressive Tool Discovery

- Purpose: Expose small capability surfaces instead of large catalogs.
- Expected use in this project: Use capability/status tools before adding specialized groups.
- Allowed phase: Phase 2B+.
- Risks: Large tool lists are harder to review and secure.
- Guardrails: Add tools only by phase and prefer dynamic capability reporting.

## TypeScript SDK

- Purpose: Official SDK for MCP servers and transports in TypeScript.
- Expected use in this project: Use `McpServer` and `StdioServerTransport` for local stdio server.
- Allowed phase: Phase 2B+.
- Risks: SDK version drift and transport misuse.
- Guardrails: Verify against installed SDK types and official SDK docs before changing primitives.
