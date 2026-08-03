# 表格元件合併 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 `src/components/tables/` 下 5 個元件裡逐字複製 5 份的狀態邏輯抽成一個 composable，並將僅差一個欄位的 `type_A`/`type_A2`、`type_B`/`type_B2` 合併為帶 `metric` prop 的單一元件，在 Playwright 視覺與行為快照保證零差異的前提下完成。

**Architecture:** 三段式。先在**未重構的現況**上建立 Playwright baseline（視覺快照 + 行為斷言），再做純機械的 composable 抽取（template 完全不動），最後才做 A/A2、B/B2 的 prop 化合併。每一段都以「Playwright 零 diff」作為通過條件，任何一段失敗都能單獨 revert。

**Tech Stack:** Vue 3 (Options API + `defineComponent` + `setup()`)、TypeScript 4.5、Tailwind 3、vue-cli 5 (webpack)、Playwright Test（新增 devDependency）。

## Global Constraints

- **Node 版本**：`.nvmrc` 指定 `18`。Playwright baseline 與驗證必須在**同一個 Node 版本**下產生與比對。
- **本機環境（2026-08-03 實測後已修復，記錄供參考）**：本機 Node 為 24.14.1。
  - `yarn install` 會因 vue-cli 的傳遞依賴 `@achrinza/node-ipc@9.2.5`（engines 限定 Node ≤18）而中止，**必須加 `--ignore-engines`**。
  - 原本未安裝全域 yarn，已於 Task 1 期間以 `npm i -g yarn` 補上（1.22.22，對應 `package.json` 的 `packageManager`）。
    **這是必要的**：`vue-cli-service serve` 編譯成功後會呼叫 `hasProjectYarn()`，只要 `yarn.lock` 存在而 PATH 沒有 `yarn` 就直接 throw，`npx yarn` 與 `corepack yarn` 都不算數。
  - 因此 `yarn serve` / `yarn lint` / `yarn test:e2e` 現在可直接使用，不需再繞 `npx --yes yarn@1.22.22`。
- **CRLF 問題已修（Task 1 期間）**：`core.autocrlf = true` 而 prettier 預設要求 LF，原本造成全 repo 1629 個 `Delete ␍` 錯誤。
  已新增 `.prettierrc.json`（內容僅 `{ "endOfLine": "auto" }`）解決，`yarn lint` 現為零錯誤。
  - **這個修復是 Task 1 的前置條件，不是可選項**：那 1629 個 eslint 錯誤會讓 webpack-dev-server 彈出全頁錯誤遮罩 iframe，攔截所有 pointer events，使 Playwright 的 hover / click 全數 timeout，視覺快照也會拍到遮罩。
  - `.prettierrc.json` **刻意只寫 `endOfLine`**，沒有採用 `.github/instructions/editor-bootstrap.instructions.md` 規定的 `semi` / `singleQuote` / `prettier-plugin-tailwindcss`——那份規範屬於未來改版，本輪維持現況（雙引號、無該 plugin）。不要在本計畫中擴充這個檔。
- **改動 lint 設定後必須清 eslint 快取**：`vue-cli-service serve` 的 eslint-webpack-plugin 會把結果快取在 `node_modules/.cache/eslint`，設定改了但快取沒清，dev server 仍會顯示舊錯誤並彈出遮罩。
  ```bash
  rm -rf node_modules/.cache/eslint node_modules/.cache/prettier
  ```
- **不得順手改動的項目**（會污染快照、屬於其他 audit 條目，本計畫一律不碰）：
  - `dayjs` → `toLocaleDateString` 的替換（輸出格式從 `2026/08/03` 變成 `2026/8/3`，會使視覺快照失敗）
  - FontAwesome / icomoon 的任何調整
  - `preview.vue` 的 `formatPlaceName`、`showTimer` 等資料格式化邏輯
  - `:key="step_${i}"` 使用 index 作 key 的既有問題（見「風險與 Review 重點」第 5 點）
- **元件命名維持原樣**：`type_A.vue`、`type_B.vue` 保留原檔名，不改名（改名只會擴大 diff，不產生任何價值）。
- **Vue 寫法維持原樣**：全專案是 `defineComponent` + `setup()`，不得在本次改成 `<script setup>`。
- **每個 Task 結束一定要 commit**，且 commit 前必須先跑過該 Task 指定的 Playwright 指令。
- 每次編輯檔案後執行 `npx prettier --write <file-path>` 再 commit。

## 給 Codex 執行者的補充（覆寫 AGENTS.md 的預設）

`AGENTS.md` 是為另一個專案寫的，以下三點在本專案不成立，**以本節為準**：

1. **計畫路徑**：本計畫在 `.github/docs/superpowers/plans/2026-08-03-merge-tables.md`，不在 `docs/superpowers/plans/`。
   本專案的 `docs/` 是 **vue-cli 的 build output 目錄**（見 `vue.config.js` 的 `outputDir: "docs"`），**任何情況下都不要手動編輯 `docs/` 下的檔案**。
2. **驗證指令**：本專案**沒有 vitest、沒有 tsc script**。不要執行 `npx vitest run` 或 `npx tsc --noEmit`。
   本計畫的驗證只有兩種：`yarn lint --no-fix` 與 `yarn test:e2e`，各 Task 的步驟裡已寫明。
3. **devDependencies**：`@playwright/test` 已由人類預先安裝完成，Codex **不需要也不得**修改 `package.json` 的 `dependencies` / `devDependencies`。
   唯一允許的 `package.json` 改動是 Task 1 Step 5 新增 `"test:e2e": "playwright test"` 這一行 script。

`AGENTS.md` 中**仍然適用**的規則：

- **不做任何 git 操作**（`git add` / `git commit` / `git push` / `git rm` 一律禁止）。sandbox 會擋 `.git/index.lock`，重試沒有意義。
  各 Task 最後的「Commit」步驟**一律跳過**，改為在回報中寫明「Task N 已完成未 commit，變更檔案：<清單>」，由人類接手。
  這也表示 Task 3 Step 6 的 `git rm` 要改成單純刪檔（`rm` 或直接刪除），不要用 git 指令。
- **不自行擴大範圍**：計畫沒寫的檔案一律不動。特別是本計畫 Global Constraints 明列的禁區（dayjs、FontAwesome/icomoon、`.prettierrc.json`、`formatPlaceName`、index key）。
- **卡住就立刻停**：第一行寫「卡在：<具體操作>」，不要跟已完成的部分混在一起講。

另外，`AGENTS.md` 提到的 `wiki/*.md` 在本專案不存在，該規則自動失效。

---

## 檔案結構

| 路徑 | 動作 | 責任 |
|---|---|---|
| `playwright.config.ts` | Create (Task 1) | Playwright 設定，含自動啟動 `yarn serve` 的 webServer |
| `e2e/fixtures/ride_plan.csv` | Create (Task 1) | 固定的測試用 CSV（CRLF 換行，格式對齊 tutorial.vue 的解析器） |
| `e2e/tables.spec.ts` | Create (Task 1) | 視覺快照 + 兩張表互不干擾的行為斷言 |
| `e2e/tables.spec.ts-snapshots/` | Create (Task 1) | baseline PNG，**必須進版控** |
| `.gitignore` | Modify (Task 1) | 加入 `test-results/`、`playwright-report/` |
| `package.json` | Modify (Task 1) | 加 `@playwright/test` devDep 與 `test:e2e` script |
| `src/composables/useSteps.ts` | Create (Task 2) | 5 個表格共用的列狀態（`MY_STEPS` / `active` / `handleGetIcon` / watch），以及 `METRIC_UNIT` 常數 |
| `src/components/tables/full.vue` | Modify (Task 2) | script 改用 composable，template 不動 |
| `src/components/tables/type_A.vue` | Modify (Task 2, 3) | Task 2 改用 composable；Task 3 加 `metric` prop |
| `src/components/tables/type_A2.vue` | Modify (Task 2) → Delete (Task 3) | 併入 type_A |
| `src/components/tables/type_B.vue` | Modify (Task 2, 3) | Task 2 改用 composable；Task 3 加 `metric` prop |
| `src/components/tables/type_B2.vue` | Modify (Task 2) → Delete (Task 3) | 併入 type_B |
| `src/components/preview.vue` | Modify (Task 3) | 改為同一元件傳不同 `metric` 使用兩次 |

---

## 現況分析（實作前必讀）

5 個表格元件的 `setup()` 內容，除了 `full.vue` 多一個 `now` 之外，**其餘四個檔逐字相同**：

```ts
const MY_STEPS = ref<Array<STEP & { icon?: string }>>([]);
const active = ref<number | null>(null);
const handleGetIcon = (icon: string) => { /* 8 行，完全相同 */ };
watch(() => props.STEPS, (v) => { MY_STEPS.value = v.map((d) => ({ ...d })); }, { immediate: true });
```

template 的差異只有這些：

| 元件 | 結構 | 每筆 step 產生的 `<tr>` 數 | 差異欄位 |
|---|---|---|---|
| `full` | 8 欄單列 + 自帶日期 caption | 1 | — |
| `type_A` | 2 欄雙列 + 上下 `myCaption` | 2 | 第二列第二格 = `average_speed` / `k/h` |
| `type_A2` | 同上 | 2 | 第二列第二格 = `wattage` / `w` |
| `type_B` | 3 欄單列 + 上下 `myCaption` | 1 | 第二格 = `average_speed` / `k/h` |
| `type_B2` | 同上 | 1 | 第二格 = `wattage` / `w` |

`type_A` 與 `type_A2` 的 `<style scoped>` 區塊逐字相同；`type_B` 與 `type_B2` 亦然。**這是可以安全合併的關鍵前提，Task 3 開始前務必自行 diff 一次確認。**

---

### Task 1: 建立 Playwright baseline（在重構前）

> **✅ 已完成（2026-08-03）**：`yarn test:e2e` 連續兩次執行皆 **5 passed**，baseline 為 `e2e/tables.spec.ts-snapshots/printer-win32.png`（40KB，內容已目視確認：五張表齊全、指標欄位左右分明、日期 mask 生效）。
>
> 執行過程踩到三個坑，全部已在 Global Constraints 記錄並修復，Task 2/3 不會再遇到：
> 1. eslint 的 1629 個 CRLF 錯誤 → dev-server 全頁遮罩 → 所有 hover/click timeout 且快照拍到遮罩（修：`.prettierrc.json`）
> 2. 改了 lint 設定但 `node_modules/.cache/eslint` 沒清 → dev server 仍顯示舊錯誤（修：清快取）
> 3. lint 修好後編譯轉為成功分支 → `vue-cli-service serve` 呼叫 `hasProjectYarn()` 找不到全域 yarn 而 throw（修：`npm i -g yarn`）

**這個 Task 絕對不能修改 `src/` 下的任何檔案。** baseline 的意義就是「重構前的樣子」，一旦動到 src 就失去比對基準。

**Files:**
- Create: `playwright.config.ts`
- Create: `e2e/fixtures/ride_plan.csv`
- Create: `e2e/tables.spec.ts`
- Modify: `package.json`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: 無（本 Task 是起點）
- Produces: `yarn test:e2e` 指令；`e2e/tables.spec.ts-snapshots/printer-win32.png` baseline 圖檔。Task 2、Task 3 都以「`yarn test:e2e` 全綠」作為通過條件。

- [ ] **Step 1: 確認 Playwright 就緒**

`@playwright/test` 已由人類預先加入 `devDependencies`，**不要再執行 `yarn add`**。只需確認並下載瀏覽器：

```bash
npx playwright --version
npx playwright install chromium
```

Expected：`npx playwright --version` 印出版本號。若顯示找不到指令，停下來回報，不要自行安裝。

- [ ] **Step 2: 建立 `playwright.config.ts`**

`vue.config.js` 在非 production 時 `publicPath` 為 `/`，所以 dev server 的 baseURL 就是根路徑。`reuseExistingServer` 讓你在本機已經開著 `yarn serve` 時不會重複啟動。

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: "http://localhost:8080",
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: "node node_modules/@vue/cli-service/bin/vue-cli-service.js serve",
    url: "http://localhost:8080",
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
```

- [ ] **Step 3: 建立測試用 CSV fixture**

`tutorial.vue` 的 `loadCSV` 以 `\r\n` 切列，所以檔案**必須是 CRLF**。用編輯器存檔容易被轉成 LF，改用 Node 產生以確保正確：

```bash
node -e "const fs=require('fs');fs.mkdirSync('e2e/fixtures',{recursive:true});fs.writeFileSync('e2e/fixtures/ride_plan.csv',['section,distance,cumulative,watt,speed,seg,cum','Section_1 台14甲_人止關,8.2,8.2,180,24.61,00:19:58,00:19:58','Section_2 人止關_中心碑,12.7,20.9,175,21.34,00:35:42,00:55:40','Section_3 中心碑_最高小七,15.3,36.2,168,18.05,00:50:51,01:46:31','Section_4 最高小七_武嶺,9.8,46.0,172,16.88,00:34:50,02:21:21'].join('\r\n'),'utf8')"
```

驗證欄位對應（來自 `tutorial.vue` 的 `formatCSV`）：`[0]`=區段名、`[1]`=distance、`[2]`=cumulative_distance、`[3]`=wattage、`[4]`=average_speed、`[5]`=segment_time、`[6]`=cumulative_time。第一列是表頭會被 `slice(1)` 丟掉。

這份 fixture 刻意包含 `最高小七`、`中心碑`、`人止關` 三個地名，因為 `preview.vue` 的 `formatPlaceName` 會把它們改寫成 `小七`、`中心`、`人止`——快照要能涵蓋這條路徑。

- [ ] **Step 4: 建立 `e2e/tables.spec.ts`**

```ts
import { test, expect, type Page, type Locator } from "@playwright/test";
import path from "path";

const CSV = path.join(__dirname, "fixtures", "ride_plan.csv");

/** #printer 內的表格順序：0=full, 1=A(均速), 2=A2(配瓦), 3=B(均速), 4=B2(配瓦) */
const table = (page: Page, i: number): Locator =>
  page.locator("#printer table").nth(i);

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.setInputFiles('input[type="file"][accept=".csv"]', CSV);
  await expect(page.locator("#printer")).toBeVisible();
  // 字型未載入完成會讓表格寬度飄移，造成快照 flaky
  await page.evaluate(() => document.fonts.ready);
});

test("五張表格的視覺快照", async ({ page }) => {
  // full.vue 的 caption 顯示今天日期，跨日會失敗，遮蔽掉
  await expect(page.locator("#printer")).toHaveScreenshot("printer.png", {
    mask: [page.locator("#printer caption .ml-auto")],
    maxDiffPixels: 0,
  });
});

test("增列只影響被操作的那一張表", async ({ page }) => {
  const a = table(page, 1);
  const a2 = table(page, 2);
  const rowsA = await a.locator("tbody tr").count();
  const rowsA2 = await a2.locator("tbody tr").count();

  await a.locator("tbody tr").first().hover();
  await a.getByTitle("增加列").click();

  // type_A 每筆 step 產生 2 個 tr，splice 插入一筆 = +2
  await expect(a.locator("tbody tr")).toHaveCount(rowsA + 2);
  await expect(a2.locator("tbody tr")).toHaveCount(rowsA2);
});

test("刪列只影響被操作的那一張表", async ({ page }) => {
  const b = table(page, 3);
  const b2 = table(page, 4);
  const rowsB = await b.locator("tbody tr").count();
  const rowsB2 = await b2.locator("tbody tr").count();

  await b.locator("tbody tr").first().hover();
  await b.getByTitle("刪除列").click();

  // type_B 每筆 step 產生 1 個 tr
  await expect(b.locator("tbody tr")).toHaveCount(rowsB - 1);
  await expect(b2.locator("tbody tr")).toHaveCount(rowsB2);
});

test("加 icon 只影響被操作的那一張表，再點一次會移除", async ({ page }) => {
  const a = table(page, 1);
  const a2 = table(page, 2);

  await a.locator("tbody tr").first().hover();
  await a.getByTitle("加入icon").click();
  // icons 陣列第一個是 fa-star
  await a.locator(".arrow .grid-cols-2 button").first().click();

  // 移開滑鼠讓 editor 收起，避免把 editor 內的 icon 也數進去
  await page.mouse.move(5, 5);
  await expect(a.locator("tbody i.fa-star")).toHaveCount(1);
  await expect(a2.locator("tbody i.fa-star")).toHaveCount(0);

  // 點同一個 icon 應該取消
  await a.locator("tbody tr").first().hover();
  await a.getByTitle("加入icon").click();
  await a.locator(".arrow .grid-cols-2 button").first().click();
  await page.mouse.move(5, 5);
  await expect(a.locator("tbody i.fa-star")).toHaveCount(0);
});

test("兩張 A 表顯示不同的指標欄位", async ({ page }) => {
  // A 顯示均速 k/h，A2 顯示配瓦 w
  await expect(table(page, 1).locator("tbody")).toContainText("k/h");
  await expect(table(page, 1).locator("tbody")).not.toContainText("w");
  await expect(table(page, 2).locator("tbody")).toContainText("w");
  await expect(table(page, 2).locator("tbody")).not.toContainText("k/h");
});
```

- [ ] **Step 5: 加入 script 與 gitignore**

`package.json` 的 `scripts` 加一行：

```json
"test:e2e": "playwright test"
```

`.gitignore` 末端加入：

```
# Playwright
/test-results
/playwright-report
```

- [ ] **Step 6: 產生 baseline 並確認全綠**

第一次執行時 `toHaveScreenshot` 會自動建立 baseline 並讓該測試「失敗」，這是預期行為。再跑第二次才是真正的驗證。

```bash
yarn test:e2e
yarn test:e2e
```

Expected：第二次執行 5 個 test 全部 PASS。若第二次仍出現像素差異，代表快照不穩定（多半是字型或動畫），**不要調高 `maxDiffPixels` 蓋過去**——先找出飄動的元素並加進 `mask`，否則後續兩個 Task 的驗證會失去意義。

- [ ] **Step 7: 確認 baseline 圖檔存在且進版控**

```bash
ls e2e/tables.spec.ts-snapshots/
git status --short
```

Expected：看到 `printer-win32.png`（檔名的平台後綴依作業系統而異），且 `git status` 顯示它是待加入的新檔。

- [ ] **Step 8: Commit**

```bash
npx prettier --write playwright.config.ts e2e/tables.spec.ts package.json
git add playwright.config.ts e2e/ package.json .gitignore
git commit -m "test: add Playwright baseline for table components"
```

---

### Task 2: 抽出 useSteps composable

**這個 Task 不得修改任何 `<template>` 或 `<style>` 區塊，只動 `<script>`。** 這樣一旦快照出現差異，就一定是邏輯抽取出錯，而不是版面調整。

**Files:**
- Create: `src/composables/useSteps.ts`
- Modify: `src/components/tables/full.vue`（script 區塊）
- Modify: `src/components/tables/type_A.vue`（script 區塊）
- Modify: `src/components/tables/type_A2.vue`（script 區塊）
- Modify: `src/components/tables/type_B.vue`（script 區塊）
- Modify: `src/components/tables/type_B2.vue`（script 區塊）

**Interfaces:**
- Consumes: Task 1 的 `yarn test:e2e`
- Produces:
  - `useSteps(source: Ref<STEP[]>) => { MY_STEPS: Ref<StepWithIcon[]>, active: Ref<number|null>, handleGetIcon: (icon: string) => void }`
  - `type StepWithIcon = STEP & { icon?: string }`
  - `const METRIC_UNIT = { average_speed: "k/h", wattage: "w" }` 與 `type Metric = keyof typeof METRIC_UNIT`（Task 3 才會用到，但在此一併定義）

- [ ] **Step 1: 建立 `src/composables/useSteps.ts`**

`STEP` 是 `src/main.ts` 裡宣告的 global type，不需要 import。

```ts
import { ref, watch, type Ref } from "vue";

export type StepWithIcon = STEP & { icon?: string };

/** 可切換的指標欄位與其單位 */
export const METRIC_UNIT = {
  average_speed: "k/h",
  wattage: "w",
} as const;

export type Metric = keyof typeof METRIC_UNIT;

/**
 * 表格共用的列狀態。
 * 每個表格各自持有一份 STEPS 的複本，使用者在某張表上增刪列或加 icon
 * 都不會影響其他表格——這是刻意的，五張表是五份可獨立編輯的小抄。
 */
export function useSteps(source: Ref<STEP[]>) {
  const MY_STEPS = ref<StepWithIcon[]>([]);
  const active = ref<number | null>(null);

  /** 加入icon 若 icon 為同個圖樣，則移除 */
  const handleGetIcon = (icon: string) => {
    if (active.value === null) return;
    const row = MY_STEPS.value[active.value];
    row.icon = row.icon === icon ? "" : icon;
  };

  watch(
    source,
    (v) => {
      MY_STEPS.value = v.map((d) => ({ ...d }));
    },
    { immediate: true }
  );

  return { MY_STEPS, active, handleGetIcon };
}
```

- [ ] **Step 2: 改寫 `type_A.vue` 的 script 區塊**

`toRef(props, "STEPS")` 是把 props 的單一屬性轉成 `Ref` 交給 composable 監聽，行為等同原本的 `watch(() => props.STEPS, ...)`。

整個 `<script lang="ts">...</script>` 替換為：

```vue
<script lang="ts">
import { defineComponent, PropType, toRef } from "vue";
import myCaption from "../myCaption.vue";
import editor from "../tableEditor.vue";
import { useSteps } from "@/composables/useSteps";

export default defineComponent({
  components: { myCaption, editor },
  props: {
    STEPS: {
      type: Array as PropType<STEP[]>,
      default: () => [],
    },
  },
  setup(props) {
    return useSteps(toRef(props, "STEPS"));
  },
});
</script>
```

- [ ] **Step 3: 對 `type_A2.vue`、`type_B.vue`、`type_B2.vue` 做完全相同的替換**

這三個檔的 script 區塊與 `type_A.vue` 原本逐字相同，替換後的內容也逐字相同（連 import 都一樣）。直接套用 Step 2 的程式碼。

- [ ] **Step 4: 改寫 `full.vue` 的 script 區塊**

`full.vue` 多一個 `now`，且**不使用 `myCaption`**（它有自己的 inline caption）。`dayjs` 保留不動（見 Global Constraints）。

```vue
<script lang="ts">
import { defineComponent, PropType, toRef } from "vue";
import DAY from "dayjs";
import editor from "../tableEditor.vue";
import { useSteps } from "@/composables/useSteps";

/** 全幅版面 */
export default defineComponent({
  components: { editor },
  props: {
    STEPS: {
      type: Array as PropType<STEP[]>,
      default: () => [],
    },
  },
  setup(props) {
    return {
      now: DAY().format("YYYY/MM/DD"),
      ...useSteps(toRef(props, "STEPS")),
    };
  },
});
</script>
```

- [ ] **Step 5: 確認編譯通過**

```bash
yarn lint
```

Expected：無錯誤。若出現 `Cannot find module '@/composables/useSteps'`，檢查 `tsconfig.json` 的 `paths` 已有 `"@/*": ["src/*"]`（它有），問題會是路徑打錯。

- [ ] **Step 6: 跑 Playwright 驗證零差異**

```bash
yarn test:e2e
```

Expected：5 個 test 全部 PASS，**且沒有產生任何新的快照檔**。
若視覺快照失敗，打開 `test-results/` 下的 `*-diff.png` 看差在哪。抽 composable 不該有任何像素變化——有差異就是抽錯了，回頭比對 `git diff`，不要更新 baseline。

- [ ] **Step 7: 確認確實刪掉了重複程式碼**

```bash
git diff --stat
```

Expected：5 個 .vue 檔合計淨減約 130 行，新增 `useSteps.ts` 約 40 行。

- [ ] **Step 8: Commit**

```bash
npx prettier --write src/composables/useSteps.ts src/components/tables/*.vue
git add src/composables/useSteps.ts src/components/tables/
git commit -m "refactor: extract useSteps composable from table components"
```

---

### Task 3: 合併 A/A2 與 B/B2

**Files:**
- Modify: `src/components/tables/type_A.vue`（加 `metric` prop，改一格 template）
- Modify: `src/components/tables/type_B.vue`（加 `metric` prop，改一格 template）
- Delete: `src/components/tables/type_A2.vue`
- Delete: `src/components/tables/type_B2.vue`
- Modify: `src/components/preview.vue`

**Interfaces:**
- Consumes: Task 2 的 `useSteps`、`METRIC_UNIT`、`Metric`
- Produces: `type_A` 與 `type_B` 各新增一個 optional prop `metric: Metric`，預設 `"average_speed"`（維持原 `type_A`/`type_B` 的行為，傳 `"wattage"` 則等同原 `type_A2`/`type_B2`）

- [ ] **Step 1: 開始前先自行確認合併前提**

```bash
git diff --no-index src/components/tables/type_A.vue src/components/tables/type_A2.vue
git diff --no-index src/components/tables/type_B.vue src/components/tables/type_B2.vue
```

Expected：每組**只有一處 `<td>` 的差異**（`average_speed`/`k/h` vs `wattage`/`w`），`<style>` 區塊零差異。
若 diff 超出這個範圍，停止並回報——本計畫的前提不成立。

- [ ] **Step 2: 在 `type_A.vue` 加入 `metric` prop**

script 區塊改為（相對 Task 2 的版本，多了 `metric` prop 與回傳 `METRIC_UNIT`）：

```vue
<script lang="ts">
import { defineComponent, PropType, toRef } from "vue";
import myCaption from "../myCaption.vue";
import editor from "../tableEditor.vue";
import { useSteps, METRIC_UNIT, type Metric } from "@/composables/useSteps";

export default defineComponent({
  components: { myCaption, editor },
  props: {
    STEPS: {
      type: Array as PropType<STEP[]>,
      default: () => [],
    },
    /** 第二列右格顯示哪個指標 */
    metric: {
      type: String as PropType<Metric>,
      default: "average_speed",
    },
  },
  setup(props) {
    return { ...useSteps(toRef(props, "STEPS")), METRIC_UNIT };
  },
});
</script>
```

- [ ] **Step 3: 改 `type_A.vue` 的那一格 template**

找到第二個 `<tr>` 內的第二個 `<td>`：

```html
          <td class="text-right">
            {{ step.average_speed || "0" }}<small>k/h</small>
          </td>
```

替換為：

```html
          <td class="text-right">
            {{ step[metric] || "0" }}<small>{{ METRIC_UNIT[metric] }}</small>
          </td>
```

其餘 template 一律不動。

- [ ] **Step 4: 在 `type_B.vue` 套用相同的兩處修改**

script 區塊套用 Step 2 的程式碼（`type_B.vue` 的 script 在 Task 2 之後與 `type_A.vue` 逐字相同，所以直接複製）。

template 找到中間那個 `<td>`：

```html
          <td class="text-right">
            {{ step.average_speed || "0" }}<small>k/h</small>
          </td>
```

替換為：

```html
          <td class="text-right">
            {{ step[metric] || "0" }}<small>{{ METRIC_UNIT[metric] }}</small>
          </td>
```

- [ ] **Step 5: 改寫 `preview.vue`**

`<template>` 內的四個 `<div>` 區塊替換為：

```html
        <div>
          <type_A :STEPS="STEPS" metric="average_speed" class="mb-5" />
        </div>
        <div>
          <type_A :STEPS="STEPS" metric="wattage" class="mb-5" />
        </div>
        <div>
          <type_B :STEPS="STEPS" metric="average_speed" />
        </div>
        <div>
          <type_B :STEPS="STEPS" metric="wattage" />
        </div>
```

script 區塊移除 `type_A2`、`type_B2` 的 import 與註冊：

```ts
import full from "./tables/full.vue";
import type_A from "./tables/type_A.vue";
import type_B from "./tables/type_B.vue";
import allEditor from "./allEditor.vue";
```

```ts
  components: { full, type_A, type_B, allEditor },
```

`setup()` 完全不動。

- [ ] **Step 6: 刪除 A2 與 B2**

```bash
git rm src/components/tables/type_A2.vue src/components/tables/type_B2.vue
```

- [ ] **Step 7: 確認沒有殘留引用**

```bash
grep -rn "type_A2\|type_B2" src/
```

Expected：無輸出。

- [ ] **Step 8: 確認編譯通過**

```bash
yarn lint
```

Expected：無錯誤。

- [ ] **Step 9: 跑 Playwright 驗證零差異**

```bash
yarn test:e2e
```

Expected：5 個 test 全部 PASS。

特別注意「兩張 A 表顯示不同的指標欄位」與「增列只影響被操作的那一張表」這兩個 test——它們正是在守 Task 3 最容易踩的兩個坑（metric 傳錯、兩個 instance 共用了狀態）。

若視覺快照失敗，先看 diff 圖確認是不是欄位順序或單位寫反了。**任何情況下都不要用 `--update-snapshots` 蓋過去**，那等同於宣布這次重構未經驗證。

- [ ] **Step 10: 確認減少的行數**

```bash
git diff --stat HEAD
```

Expected：刪除 2 個檔約 180 行，`type_A`/`type_B`/`preview.vue` 合計微幅增加約 15 行。

- [ ] **Step 11: Commit**

```bash
npx prettier --write src/components/tables/type_A.vue src/components/tables/type_B.vue src/components/preview.vue
git add src/components/tables/ src/components/preview.vue
git commit -m "refactor: merge type_A2/type_B2 into type_A/type_B via metric prop"
```

---

## 風險與 Review 重點

按「壞掉的可能性 × 壞掉的嚴重度」排序。每一條都標明由哪個測試守著。

**1. 兩張表共用了狀態（最高風險）**
合併後 `type_A` 在 `preview.vue` 被使用兩次。若誤把 `MY_STEPS` 寫成 module scope 的變數（而非在 `useSteps()` 內 `ref()`），兩張表會共用同一份資料——使用者在均速表刪一列，配瓦表也跟著少一列。
`useSteps` 每次呼叫都建立新的 `ref`，Vue 每個 component instance 各呼叫一次 `setup()`，所以行為正確。
**守門測試**：「增列只影響被操作的那一張表」「刪列只影響被操作的那一張表」「加 icon 只影響被操作的那一張表」。

**2. `metric` prop 傳錯或漏傳**
`preview.vue` 的四個 `<div>` 順序若寫錯，畫面上兩張表會顯示同一個指標。因為 prop 有 default，漏傳不會報錯，只會靜默地變成均速。
**守門測試**：「兩張 A 表顯示不同的指標欄位」明確斷言 A 有 `k/h` 且沒有 `w`、A2 反之。

**3. `step[metric]` 的型別**
`metric` 的型別是 `Metric = "average_speed" | "wattage"`，兩個 key 在 `STEP` 上都是 `string`，所以 `step[metric]` 型別安全，`|| "0"` 的 fallback 行為與原本逐字相同（空字串會 fallback，`"0"` 也會 fallback 成 `"0"`）。
**守門**：`yarn lint`（TypeScript strict 模式已開）。

**4. `toRef(props, "STEPS")` 與原本 `watch(() => props.STEPS)` 的等價性**
兩者都在 `props.STEPS` 這個 reference 換掉時觸發。`preview.vue` 傳入的是 `computed`，每次 `modelValue` 變動會產生**新陣列**，所以 reference 一定會變、watch 一定會觸發。行為等價。
**守門測試**：所有測試的 `beforeEach` 都會上傳 CSV 觸發一次資料流入，若 watch 沒觸發，`#printer` 內的表格會是空的，全部測試立刻失敗。

**5. `:key="step_${i}"` 用 index 當 key（既有問題，本次不修）**
`splice` 插入或刪除中間的列時，index key 會讓 Vue 重用 DOM 節點。因為表格是 `contenteditable`，使用者手動改過的文字可能會「留在原位」而不跟著資料走。
這在重構前後**行為一致**，不屬於本計畫範圍。合併後仍是同樣的問題，不會變好也不會變壞。
**若之後要修**：key 改成從資料產生穩定 id（例如在 `useSteps` 的 map 裡加 `_id: crypto.randomUUID()`），但那需要另一輪 Playwright baseline，因為 DOM 重用行為改變可能影響快照。

**6. 快照的跨平台/跨機器不可攜性**
`toHaveScreenshot` 產生的 PNG 帶平台後綴（`-win32.png`），在另一台機器或 CI 上重跑會因字型 rasterize 差異而失敗。
**本計畫的定位是「同一台機器上的重構前後比對」**，不是長期的 CI 視覺回歸。Task 1～3 跑完之後，如果不打算維護它，`git rm -r e2e/tables.spec.ts-snapshots/` 把圖刪掉、保留行為測試即可（行為測試是跨平台穩定的）。

**7. `full.vue` 的日期造成跨日失敗**
`DAY().format("YYYY/MM/DD")` 每天不同。已用 `mask` 遮蔽該區塊，但如果重構橫跨午夜且 mask 的 selector 沒對準，快照會失敗。
**檢查方式**：第一次產生 baseline 後打開 PNG，確認日期位置是一塊粉紅色遮罩。

**8. Node 版本**
`.nvmrc` 是 `18`，若本機跑 Node 24，vue-cli 5 / webpack 5 大致可運作但非專案宣告的環境。baseline 與驗證只要在**同一個版本**下進行就不影響比對結果。

---

## 預期成果

| 項目 | 前 | 後 |
|---|---|---|
| `src/components/tables/` 檔案數 | 5 | 3 |
| 該目錄行數 | 475 | 約 210 |
| 重複的 `setup()` 邏輯 | 5 份 | 1 份 |
| 新增檔案 | — | `src/composables/useSteps.ts`（約 40 行） |
| 新增 devDependency | — | `@playwright/test` |
| 執行期行為 | — | 完全不變（由 5 個測試保證） |
