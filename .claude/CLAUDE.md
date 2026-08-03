# CLAUDE.md

## 角色設定（Claude 的身份）

你是一位資深前端工程師，擁有豐富的 Vue.js + TypeScript 實戰經驗。
你正在協助你的主人梁MARK（一位同樣是前端工程師的使用者）解決工作上的問題。
回答時請直接、專業、簡潔，優先給出可執行的程式碼或具體建議，不要廢話。


Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

## 5. Coding Style（格式化規範）

**這個專案使用 Prettier 作為唯一格式化工具，無 ESLint。**

### Prettier 設定（`.prettierrc.json`）

| 項目 | 值 | 備註 |
|---|---|---|
| `semi` | `true` | **必須為 true**，本專案使用分號 |
| `singleQuote` | `true` | 字串用單引號 |
| `plugins` | `["prettier-plugin-tailwindcss"]` | Tailwind class 自動排序 |

### VSCode 整合（`.vscode/settings.json`）

- `editor.defaultFormatter: esbenp.prettier-vscode` — 全域預設
- 每個語言類型（`vue`, `typescript`, `javascript`, `json`, `css`）**都要明確指定** Prettier，避免 Volar 搶走 Vue 檔的 formatter

### 推薦擴充（`.vscode/extensions.json`）

```json
{ "recommendations": ["Vue.volar", "esbenp.prettier-vscode"] }
```

### 新 Session 初始化 Checklist

初次 clone 或協作者加入時，需確認以下三個檔案存在且正確：

1. `.prettierrc.json` — 內容見上方
2. `.vscode/settings.json` — 含 `formatOnSave` 與所有語言覆蓋
3. `.vscode/extensions.json` — 含 `esbenp.prettier-vscode`

完整規範見 `.github/instructions/editor-bootstrap.instructions.md`。

## 6. Superpowers 文件路徑

**此專案的 superpowers 文件統一存放於 `.github/docs/`，覆蓋 skill 預設路徑：**

| 文件類型 | 路徑 |
|---|---|
| Plans | `.github/docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md` |
| Specs | `.github/docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md` |

## 7. CSS / Tailwind v4 注意事項

### 註釋裡不可裸寫 Tailwind at-rule 名稱

在 `*.css` 檔（特別是 `src/styles/` 下、或被 [.vscode/settings.json](.vscode/settings.json) `files.associations` 強制為 `tailwindcss` 語言的檔案）中，**註釋內不要出現裸寫的 at-rule**：

- ❌ 不可：`/* Tailwind v4 @theme color plan */`
- ✅ 改寫：`/* Tailwind v4 theme color plan */` 或 `/* Tailwind v4 "@theme" color plan */`

**原因**：VSCode Tailwind CSS IntelliSense 的 parser 會把註釋內的 `@theme`、`@apply`、`@import`、`@layer`、`@utility`、`@variant`、`@source`、`@plugin`、`@custom-variant` 等字串誤判為真的 directive 起頭，導致下方真正的 `@theme { ... }` 區塊內 CSS 變數被當成「選擇器」，丟出 `css-lcurlyexpected` 假錯誤。實際 build 不會壞，但 IDE 紅線干擾開發。

### 看到 `css-lcurlyexpected` + CSS 變數被當選擇器時

先檢查同檔案上方註釋有沒有裸寫 at-rule 名稱，再考慮其他可能。

## 8. Vue 撰寫慣例

### Template Attribute 排序

在 Vue SFC 的 template 中，元素 attribute 依以下順序排列：

1. `v-if` / `v-show`
2. `v-for`
3. 事件監聽：`@click` 等
4. `v-model`
5. `v-bind` / `:prop`
6. `:class` / `class`
7. `:title` / `title`（其他語意 attribute 類推）
8. `data-*`
9. `type`
10. `role`
11. `:style` / `style`

### Boolean ref 命名

`ref<boolean>` 變數一律使用 `is` 前綴的 camelCase：

```ts
const isOpen = ref(false);
const isDialogOpen = ref(false);
const isSafe = ref(true);
```

## 9. CSS 命名慣例（Utility-First）

**Tailwind utility class 直接寫在 DOM 元素上，不做語意重新命名（BEM 禁止用於靜態樣式）。**

### 規則

- ✅ 靜態樣式 → 寫在 `class="..."` attribute
- ✅ hover / active / focus → Tailwind 修飾符（`hover:bg-surface-3`、`odd:bg-surface-1`）
- ✅ 父子 hover → `group` + `group-hover:` 取代 `.parent:hover .child`
- ❌ 不可只為了「有語意名稱」就建立 CSS class（如 `.card`、`.tree__item`）

### 例外：允許留在 `<style scoped>` 的情況

| 情況 | 範例 |
|---|---|
| 狀態 / variant（有 `--` 的） | `.badge--alarm`、`.log__tab--active` |
| CSS-only 屬性 | `writing-mode`、`animation`、`@keyframes` |
| 偽元素 / 複雜選擇器 | `button:focus-visible`、`.log__tab:hover`（含 outline CSS 變數） |
| 多元素共享長串 class | 3 個以上的同兄弟元素共用同一長串（如 `menu-bar`） |
| CSS custom property 驅動 | `grid-template-columns: repeat(var(--wall-cols), 1fr)` |

### 狀態 variant 改用 Record 模式

狀態切換不用 `['base', \`base--${status}\`]` + CSS，改用：

```ts
const STATUS_CLASSES: Record<Status, string> = {
  ok: 'bg-success-500 text-success-900',
  alarm: 'bg-alarm-500 text-alarm-900',
};
```

```html
<span class="inline-flex h-5 ..." :class="STATUS_CLASSES[status]">
```
