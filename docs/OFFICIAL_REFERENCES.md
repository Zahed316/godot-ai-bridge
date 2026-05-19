# Official References

This file indexes official references only. It is not a documentation dump.

## Godot Official References

| Title | URL | Why it matters | Planned phase |
| --- | --- | --- | --- |
| EditorPlugin | https://docs.godotengine.org/en/stable/classes/class_editorplugin.html | Defines the editor plugin entry point, lifecycle, bottom panel APIs, and undo access. | Phase 3+ |
| Making plugins | https://docs.godotengine.org/en/stable/tutorials/plugins/editor/making_plugins.html | Defines `plugin.cfg`, addon layout, and `@tool extends EditorPlugin` basics. | Phase 3 |
| @GDScript / `@tool` | https://docs.godotengine.org/en/stable/classes/class_%40gdscript.html | Defines `@tool` annotation behavior for editor-executed scripts. | Phase 3+ |
| EditorInterface | https://docs.godotengine.org/en/stable/classes/class_editorinterface.html | Provides access to edited scenes, selection, editor UI, and resource/script editing. | Phase 3+ |
| EditorUndoRedoManager | https://docs.godotengine.org/en/stable/classes/class_editorundoredomanager.html | Required for editor-integrated safe write operations and undo history. | Phase 6+ |
| ProjectSettings | https://docs.godotengine.org/en/stable/classes/class_projectsettings.html | Source for project metadata and controlled project setting reads/writes. | Phase 5+ |
| FileAccess | https://docs.godotengine.org/en/stable/classes/class_fileaccess.html | File read/write API; must be wrapped by path guard and approval rules. | Phase 5+ |
| DirAccess | https://docs.godotengine.org/en/stable/classes/class_diraccess.html | Directory listing and creation API; must stay project-scoped. | Phase 5+ |
| WebSocketPeer | https://docs.godotengine.org/en/stable/classes/class_websocketpeer.html | Candidate local transport peer for Godot-side bridge connection. | Phase 4 |
| Node | https://docs.godotengine.org/en/stable/classes/class_node.html | Base scene object for future read-only scene inspection and safe edits. | Phase 5+ |
| SceneTree | https://docs.godotengine.org/en/stable/classes/class_scenetree.html | Manages active node hierarchy, current scene, groups, and scene switching. | Phase 5+ |
| Resource | https://docs.godotengine.org/en/stable/classes/class_resource.html | Base data container for assets, scenes, and scripts. | Phase 5+ |
| PackedScene | https://docs.godotengine.org/en/stable/classes/class_packedscene.html | Serialized scene resource for future scene inspection and transaction work. | Phase 5+ |
| Script | https://docs.godotengine.org/en/stable/classes/class_script.html | Official source for script source/reload behavior; useful for validation planning. | Phase 7+ |
| Viewport | https://docs.godotengine.org/en/stable/classes/class_viewport.html | Basis for viewport capture through textures in future screenshot tools. | Phase 5+ |
| ViewportTexture | https://docs.godotengine.org/en/stable/classes/class_viewporttexture.html | Documents Viewport texture access used by screenshot/capture planning. | Phase 5+ |

## MCP Official References

| Title | URL | Why it matters | Planned phase |
| --- | --- | --- | --- |
| Architecture overview | https://modelcontextprotocol.io/docs/learn/architecture | Defines host/client/server roles, data layer, transport layer, and primitives. | Phase 2B+ |
| Transports | https://modelcontextprotocol.io/docs/concepts/transports | Defines stdio requirements, stdout/stderr rules, and localhost guidance. | Phase 2B+ |
| Tools | https://modelcontextprotocol.io/specification/2025-06-18/server/tools | Defines tool discovery, calls, schemas, annotations, output schemas, and safety model. | Phase 2B+ |
| Resources | https://modelcontextprotocol.io/docs/concepts/resources | Defines resource discovery, URI schemes, content, and resource security. | Future |
| Prompts | https://modelcontextprotocol.io/docs/concepts/prompts | Defines user-controlled prompt templates and validation expectations. | Future |
| Schema reference | https://modelcontextprotocol.io/specification/2025-11-25/schema | Defines protocol shapes including tool input/output schemas and structured content. | Phase 2B+ |
| SDKs | https://modelcontextprotocol.io/docs/sdk | Identifies the official TypeScript SDK as a supported SDK. | Phase 2B+ |
| TypeScript SDK server guide | https://ts.sdk.modelcontextprotocol.io/documents/server.html | Shows `McpServer` and `StdioServerTransport` usage for local stdio servers. | Phase 2B+ |
| Build an MCP server | https://modelcontextprotocol.io/docs/develop/build-server | Official implementation path for a TypeScript MCP server. | Phase 2B+ |

## Security Research References

| Title | URL | Why it matters | Planned phase |
| --- | --- | --- | --- |
| MCP transport security warning | https://modelcontextprotocol.io/docs/concepts/transports | Requires Origin validation for HTTP transports and localhost binding for local servers. | Phase 4+ |
| MCP tools trust and safety | https://modelcontextprotocol.io/specification/2025-06-18/server/tools | Tools should be visible to users, and sensitive operations need human approval. | Phase 2B+ |
| MCP resources security | https://modelcontextprotocol.io/docs/concepts/resources | Resource URIs and permissions must be validated before access. | Phase 5+ |
| MCP prompts security | https://modelcontextprotocol.io/docs/concepts/prompts | Prompt arguments and outputs must be validated against injection and unauthorized access. | Future |
| Godot `@tool` script caution | https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html#tool-mode | Tool scripts run in the editor; unsafe freeing or arbitrary execution can crash/editor-compromise work. | Phase 3+ |
