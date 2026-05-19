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
- `docs/OFFICIAL_REFERENCES.md`
- `docs/GODOT_API_INDEX.md`
- `docs/MCP_API_INDEX.md`
- `docs/IMPLEMENTATION_GUARDRAILS.md`

## پایه مهندسی

پیش از پیاده‌سازی، عامل‌ها باید این موارد را رعایت کنند:

- `docs/DEVELOPMENT.md`
- `docs/QUALITY_GATES.md`
- `docs/SCHEMA_CONVENTIONS.md`
- `docs/ERROR_MODEL.md`
- `docs/ADR/`

وضعیت فعلی پیاده‌سازی: فاز 3 یک سرور حداقلی MCP stdio و یک پنل وضعیت حداقلی در ویرایشگر Godot دارد. سرور MCP فقط دو ابزار امن و read-only برای bridge ارائه می‌کند: `bridge.status` و `bridge.get_capabilities`.

هنوز bridge وب‌سوکت وجود ندارد. هنوز اجرای command وجود ندارد.

این پروژه اکنون indexهای فشرده API رسمی برای Godot و MCP دارد. این indexها به منابع رسمی لینک می‌دهند و guardrailهای مخصوص پروژه را بدون کپی کردن صفحات طولانی مستندات خلاصه می‌کنند.

معماری هدف:

`Cursor` / `Claude` / `Codex` / `Cline` → MCP stdio server → localhost WebSocket → Godot Editor Plugin

این مخزن هنوز bridge وب‌سوکت یا هیچ منطق خودکارسازی Godot را پیاده‌سازی نکرده است.
