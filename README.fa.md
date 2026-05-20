# godot-ai-bridge

`godot-ai-bridge` یک پروژه متن‌باز و clean-room برای اتصال عامل‌های AI به Godot 4 از طریق یک bridge محلی و امن است.

این نسخه فارسی است. نسخه انگلیسی: [README.md](README.md)

## متن‌باز

این پروژه تحت مجوز MIT متن‌باز است. پروژه‌های عمومی Godot MCP فقط برای benchmark، برنامه‌ریزی scope، و طراحی امن بررسی می‌شوند.

پلاگین عمومی Godot در `youichi-uda/godot-mcp-pro` مجوز MIT دارد، اما سرور TypeScript MCP آن proprietary است و در این پروژه reuse نمی‌شود.

لینک‌ها:

- [سیاست متن‌باز](docs/OPEN_SOURCE_POLICY.md)
- [برنامه اقتباس از Pro](docs/PRO_ADOPTION_PLAN.md)
- [اعلان‌های شخص ثالث](THIRD_PARTY_NOTICES.md)

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

وضعیت فعلی پیاده‌سازی: فاز 6B یک سرور حداقلی MCP stdio، یک پنل وضعیت حداقلی در ویرایشگر Godot، یک bridge وب‌سوکت فقط روی localhost، اولین ابزارهای inspection فقط-خواندنی پروژه و scene در Godot، foundation امن مشترک برای bridge، و foundation داخلی transaction/snapshot را دارد.

سرور MCP دقیقاً پنج ابزار فقط-خواندنی ارائه می‌کند: `bridge.status`، `bridge.get_capabilities`، `project.get_info`، `project.get_filesystem_tree`، و `scene.get_tree`.

bridge اکنون پاسخ‌های خطای ساختاریافته فقط-خواندنی، metadata مربوط به heartbeat، قرارداد path guard فقط-خواندنی در سطح string، و helperهای داخلی transaction/snapshot به‌صورت metadata-only دارد. هنوز ابزار write یا اجرای command وجود ندارد.

این پروژه compatibility با نام‌های رایج ابزارهای Godot MCP را در [Tool compatibility](docs/TOOL_COMPATIBILITY.md) دنبال می‌کند. نام‌های canonical داخلی از dot notation استفاده می‌کنند، و هدف‌های ناسازگار با ایمنی مرحله‌بندی شده و به‌صورت پیش‌فرض غیرفعال هستند.

این پروژه اکنون indexهای فشرده API رسمی برای Godot و MCP دارد. این indexها به منابع رسمی لینک می‌دهند و guardrailهای مخصوص پروژه را بدون کپی کردن صفحات طولانی مستندات خلاصه می‌کنند.

معماری هدف:

`Cursor` / `Claude` / `Codex` / `Cline` → MCP stdio server → localhost WebSocket → Godot Editor Plugin

این مخزن هنوز هیچ منطق خودکارسازی write برای Godot را پیاده‌سازی نکرده است.
