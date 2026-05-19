# godot-ai-bridge

`godot-ai-bridge` یک پروژه متن‌باز و clean-room برای اتصال عامل‌های AI به Godot 4 از طریق یک bridge محلی و امن است.

معماری هدف:

`Cursor` / `Claude` / `Codex` / `Cline` -> سرور MCP از طریق stdio -> WebSocket محلی -> افزونه ویرایشگر Godot

فاز 1 فقط bootstrap است. این مخزن در حال حاضر فقط ساختار، مستندات و قوانین عامل‌ها را تعریف می‌کند. هنوز سرور MCP، bridge وب‌سوکت، یا هر منطق خودکارسازی Godot پیاده‌سازی نشده است.

