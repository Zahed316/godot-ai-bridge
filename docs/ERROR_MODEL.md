# Error Model

Structured error shape:

```json
{
  "ok": false,
  "error": {
    "code": "STRING_CODE",
    "message": "Human-readable message.",
    "details": {},
    "suggestions": []
  }
}
```

Implemented Phase 6A error codes:

- `BRIDGE_NOT_CONNECTED`
- `METHOD_NOT_FOUND`
- `INVALID_PARAMS`
- `PATH_NOT_ALLOWED`
- `OPERATION_DENIED`
- `TIMEOUT`
- `INTERNAL_ERROR`

Planned future write-phase error codes:

- `SNAPSHOT_REQUIRED`
- `APPROVAL_REQUIRED`
- `GODOT_EDITOR_ERROR`

Phase 6A uses the structured error model for read-only bridge failures only.

Official MCP references for future runtime error behavior are indexed in `docs/MCP_API_INDEX.md` and `docs/OFFICIAL_REFERENCES.md`.
