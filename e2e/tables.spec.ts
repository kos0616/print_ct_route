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
  // icons 陣列第一個是 icon-star
  await a.locator(".arrow .grid-cols-2 button").first().click();

  // 移開滑鼠讓 editor 收起，避免把 editor 內的 icon 也數進去
  await page.mouse.move(5, 5);
  await expect(a.locator("tbody i.icon-star")).toHaveCount(1);
  await expect(a2.locator("tbody i.icon-star")).toHaveCount(0);

  // 點同一個 icon 應該取消
  await a.locator("tbody tr").first().hover();
  await a.getByTitle("加入icon").click();
  await a.locator(".arrow .grid-cols-2 button").first().click();
  await page.mouse.move(5, 5);
  await expect(a.locator("tbody i.icon-star")).toHaveCount(0);
});

test("四張小表各自顯示正確的指標數值", async ({ page }) => {
  // 必須斷言「數值」而非只看單位標籤：若 template 誤把值寫死成 average_speed
  // 而單位仍隨 metric 變動，只檢查 k/h 與 w 的版本會假陽性通過。
  // fixture 第一段：均速 24.61 → preview 的 Math.floor → 24；配瓦 180。
  for (const i of [1, 3]) {
    await expect(table(page, i).locator("tbody")).toContainText("24k/h");
    await expect(table(page, i).locator("tbody")).not.toContainText("w");
  }
  for (const i of [2, 4]) {
    await expect(table(page, i).locator("tbody")).toContainText("180w");
    await expect(table(page, i).locator("tbody")).not.toContainText("k/h");
  }
});

test("上傳後教學區反映上傳狀態", async ({ page }) => {
  // tutorial.vue 的 isUpload 由 App.vue 經 prop 傳入（它自己不持有 STEPS）。
  // prop 若斷掉，這兩個都會停在未上傳的樣子，而其他測試只看 #printer 抓不到。
  // 用 title 定位 uploader 的 label，避免命中教學文字裡的「匯入成功可在底下預覽與編輯」
  await expect(page.getByTitle("匯入 ride_plan.csv")).toContainText("匯入成功");
  await expect(page.locator("#intro").getByTitle("列印小抄")).toBeEnabled();
});

test("full 表的日期為 YYYY/MM/DD 補零格式", async ({ page }) => {
  // 這一格在視覺快照中被 mask 遮住，格式退化（例如 2026/8/3）快照抓不到，
  // 必須獨立斷言 —— 否則日期實作換掉時沒有任何測試會發現。
  await expect(page.locator("#printer caption .ml-auto").first()).toHaveText(
    /^\d{4}\/\d{2}\/\d{2}$/
  );
});
