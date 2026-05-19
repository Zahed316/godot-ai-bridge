# Error Model

Future structured error shape:

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

Planned error codes:

- `BRIDGE_NOT_CONNECTED`
- `METHOD_NOT_FOUND`
- `INVALID_PARAMS`
- `PATH_NOT_ALLOWED`
- `OPERATION_DENIED`
- `SNAPSHOT_REQUIRED`
- `APPROVAL_REQUIRED`
- `GODOT_EDITOR_ERROR`
- `TIMEOUT`
- `INTERNAL_ERROR`

No runtime code should use this yet; this is only the future contract.

Official MCP references for future runtime error behavior are indexed in `docs/MCP_API_INDEX.md` and `docs/OFFICIAL_REFERENCES.md`.
