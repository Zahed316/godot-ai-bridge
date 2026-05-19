# godot-ai-bridge

`godot-ai-bridge` یک پروژه متن‌باز و clean-room برای اتصال عامل‌های AI به Godot 4 از طریق یک bridge محلی و امن است.

این نسخه فارسی است. نسخه انگلیسی: [README.md](README.md)

## دانش پروژه

پیش از پیاده‌سازی هر قابلیت، عامل‌ها باید این فایل‌ها را بخوانند:

- `docs/GODOT_KNOWLEDGE.md`
- `docs/MCP_KNOWLEDGE.md`
- `docs/API_BOUNDARIES.md`
- `docs/AGENT_ROLES.md`
- `docs/NEXT_PHASES.md`

معماری هدف:

`Cursor` / `Claude` / `Codex` / `Cline` → MCP stdio server → localhost WebSocket → Godot Editor Plugin

فاز 1 فقط bootstrap است. این مخزن در حال حاضر فقط ساختار، مستندات و قوانین عامل‌ها را تعریف می‌کند. هنوز سرور MCP، bridge وب‌سوکت، یا هر منطق خودکارسازی Godot پیاده‌سازی نشده است.
