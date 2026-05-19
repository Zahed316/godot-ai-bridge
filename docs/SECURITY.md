# Security Principles

The bridge is designed to be local-first and restrictive by default.

Required principles:

- Bind only to `127.0.0.1`.
- Use a random session token handshake.
- Do not allow arbitrary script execution by default.
- Do not allow external command execution by default.
- Enforce a path guard for `res://` and `user://`.
- Deny path traversal.
- Require snapshot and approval for all risky writes.
- Audit every tool call.

Security-sensitive features should remain opt-in and must be reviewed before they are enabled.

