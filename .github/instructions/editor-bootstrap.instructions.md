---
description: 'Use when initializing the workspace, scaffolding project defaults, setting up VS Code editor settings, or fixing first-run Tailwind/CSS diagnostics.'
name: 'Editor Bootstrap Rules'
---

# Editor Bootstrap Rules

- Apply these rules only during initial project setup or workspace bootstrap.
- Store VS Code workspace settings only in `.vscode/settings.json`.
- Never create or modify `.vscode/setting.json`; that filename is invalid.
- Tailwind CSS v4 uses `@import "tailwindcss"` — ensure `css.lint.unknownAtRules` is set to `ignore`.

## Playwright MCP Artifacts

- Ensure `.playwright-mcp/` is listed in `.gitignore`.

## Prettier Setup

Create `.prettierrc.json` at the project root with the following content.
**Do not change `semi` to `false`** — this project uses semicolons.

```json
{
  "semi": true,
  "singleQuote": true,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

Ensure VS Code uses Prettier as the default formatter in `.vscode/settings.json`.
Per-language overrides are required to prevent Volar or other extensions from overriding the formatter silently:

```json
{
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "css.lint.unknownAtRules": "ignore",
  "scss.lint.unknownAtRules": "ignore"
}
```

Ensure `.vscode/extensions.json` recommends the Prettier extension:

```json
{
  "recommendations": ["Vue.volar", "esbenp.prettier-vscode"]
}
```
