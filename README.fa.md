# godot-ai-bridge

`godot-ai-bridge` یک پروژه متن‌باز و clean-room برای اتصال عامل‌های AI به Godot 4 از طریق یک bridge محلی و امن است.

این نسخه فارسی است. نسخه انگلیسی: [README.md](README.md)

معماری هدف:

`Cursor` / `Claude` / `Codex` / `Cline` → MCP stdio server → localhost WebSocket → Godot Editor Plugin

فاز 1 فقط bootstrap است. این مخزن در حال حاضر فقط ساختار، مستندات و قوانین عامل‌ها را تعریف می‌کند. هنوز سرور MCP، bridge وب‌سوکت، یا هر منطق خودکارسازی Godot پیاده‌سازی نشده است.
