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

test("兩張 A 表顯示不同的指標欄位", async ({ page }) => {
  // A 顯示均速 k/h，A2 顯示配瓦 w
  await expect(table(page, 1).locator("tbody")).toContainText("k/h");
  await expect(table(page, 1).locator("tbody")).not.toContainText("w");
  await expect(table(page, 2).locator("tbody")).toContainText("w");
  await expect(table(page, 2).locator("tbody")).not.toContainText("k/h");
});
