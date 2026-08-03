# IcoMoon 字型更新操作指南（人工步驟）

> **✅ 已於 2026-08-03 執行完畢**（commit `fc1c4c2`）。本文保留作為「日後要再新增 icon」的操作參考。
>
> **實際結果與本文預期的差異**：
>
> | 項目 | 指南預期 | 實際 |
> |---|---|---|
> | `fa-fill` | `icon-fill` | **`icon-paint-brush`**（畫筆代油漆桶） |
> | `fa-arrow-trend-up/down` | `icon-arrow-trend-up/down` | **`icon-trending_up` / `icon-trending_down`**（底線，非連字號） |
> | `fa-utensils` | `icon-utensils` | **`icon-cutlery`**（FA4 舊名） |
> | `fa-envelope` | `icon-envelope` | **`icon-envelope-o`** |
> | `fa-truck-droplet` | 找替代圖 | **併入 `icon-droplet`**，區段標記由 8 個減為 7 個 |
> | `.icon-fw` 寬度 | `1.28571429em`（FA4 值） | **`1.25em`**（FA6 實際值） |
>
> **驗證結果**：既有 15 個 icon 的 codepoint 逐一比對零位移；Playwright 5 tests passed；另以五張截圖目視確認所有 icon 正確渲染（非豆腐字）。
>
> **順帶發現**：新版 `style.css` 已不再引用 `.eot`，原 `fonts/icomoon.eot` 成為孤兒檔，已一併刪除。
>
> **注意**：視覺快照 `printer-win32.png` 涵蓋的是 `#printer` 區域，該區只有 `myCaption` 的 `icon-image` 是常駐 icon。`tableEditor`（hover 才出現）、`allEditor`（在 `#printer` 之外）、`step.icon`（初始為空）都**不在快照範圍內**——所以這次快照沒變並不代表 icon 無誤，目視驗證是必要的。日後再動 icon 時請沿用同樣做法。


**目的**：把專案目前用到的 14 個 Font Awesome icon 併進現有的 IcoMoon 字型，之後即可刪除整個 `public/css/fontawesome-free-6.2.0-web/`（1.4MB），全站只剩一套 icon 系統。

**為什麼需要人工**：IcoMoon 的字型產生是網頁服務，沒有官方 CLI；而且 `public/css/fontawesome-free-6.2.0-web/` 是 web 發行包，裡面只有打包好的字型檔與 CSS，**沒有個別 SVG 原始檔**，所以連素材都得從 IcoMoon 內建的 Font Awesome 集取得。這一段 AI 代勞不了。

**你做完網頁操作、把新字型包放進 repo 之後，剩下的程式碼替換交給我**（有 Playwright 快照守著，改壞會立刻知道）。

---

## Part 1：你要做的（icomoon.io 網頁操作）

### Step 1. 備份現有字型包

先留一份還原點，網頁操作出錯時不用重來：

```bash
cp -r public/css/icomoon public/css/icomoon.bak
```

（做完整件事確認沒問題後再刪掉 `icomoon.bak`。）

### Step 2. 開啟 IcoMoon App

前往 <https://icomoon.io/app/>。不需要註冊或登入。

### Step 3. 匯入現有的 selection.json（**最關鍵的一步，不可跳過**）

左上角 **漢堡選單（≡）** → **Manage Projects** → **Import Project** → 選擇：

```
public/css/icomoon/selection.json
```

匯入後點 **Load** 載入該專案。

> **為什麼不可跳過**：`selection.json` 記錄了現有 11 個 icon 的 **codepoint（字元編碼）**。若不匯入而是從零開始挑，新字型的 codepoint 會重新分配，導致現有的 `icon-print`、`icon-check`、`icon-scissors` 等**全部錯位**（印表機圖示可能變成剪刀）。匯入後新增的 icon 會接在既有編碼後面，舊的不動。

匯入成功的判斷：畫面上會看到現有的 15 個 icon（check、chevron-down、cut/scissors、edit、file-text、github、icomoon、image、lightbulb、print、table、trash 等），且它們是**已選取（反白）**狀態。

### Step 4. 加入 Font Awesome 圖庫

左下角 **Add Icons From Library...** → 找到 **Font Awesome** → 點 **Add**。

圖庫會出現在畫面上方成為一個新的分區。

### Step 5. 挑選這 14 個 icon

在 Font Awesome 分區用上方搜尋框逐一搜尋並**點擊選取**（選取後會反白）。

| # | Font Awesome class | 在 IcoMoon 搜尋 | 用途 | 備註 |
|---|---|---|---|---|
| 1 | `fa-fill` | `fill` / `paint` | 變更表格顏色 | 找油漆桶/填色圖示 |
| 2 | `fa-text-height` | `text-height` | 變更文字大小 | |
| 3 | `fa-plus` | `plus` | 新增一列表格 | |
| 4 | `fa-star` | `star` | 區段標記 | 實心版 |
| 5 | `fa-flag` | `flag` | 區段標記 | |
| 6 | `fa-arrow-trend-up` | `arrow-up` / `trending-up` | 區段標記（爬升） | FA6 新圖，IcoMoon 的 FA 集若無此圖，用 `arrow-up-right` 或 `stats-up` 代替 |
| 7 | `fa-arrow-trend-down` | `arrow-down` / `trending-down` | 區段標記（下坡） | 同上 |
| 8 | `fa-droplet` | `droplet` / `tint` | 區段標記（補水） | FA6 的 `droplet` 在舊版叫 `tint` |
| 9 | `fa-utensils` | `utensils` / `cutlery` | 區段標記（補給） | FA6 的 `utensils` 在舊版叫 `cutlery` |
| 10 | `fa-truck-droplet` | `truck` | 區段標記（水車） | FA6 新圖，多半找不到，見下方「找不到時怎麼辦」 |
| 11 | `fa-truck` | `truck` | 區段標記（補給車） | |
| 12 | `fa-comment` | `comment` / `bubble` | 留言按鈕 | 原本用 **regular（空心）** 樣式，優先挑空心版 |
| 13 | `fa-times` | `times` / `cross` / `close` | 關閉彈窗 | |
| 14 | `fa-envelope` | `envelope` / `mail` | Email 連結 | |

**不需要新增的**：`fa-trash-can` 與 `fa-trash-alt`（同一個圖的新舊名）→ 現有的 **`icon-trash` 已可直接沿用**。

#### 找不到時怎麼辦

IcoMoon 內建的 Font Awesome 集是 **FA4/FA5 世代**，上表第 6、7、10 這幾個 FA6 新圖很可能不存在。三個選項，任選：

- **挑一個語意接近的替代圖**（推薦，最省事）。例如 `truck-droplet` 直接用 `truck` 代替——它只是表格上的區段標記，語意接近即可。
- **從別的圖庫找**：IcoMoon 還有 IcoMoon Free、Material Icons 等免費集，`Add Icons From Library...` 裡都能加。
- **自己上傳 SVG**：從 <https://fontawesome.com/icons> 搜尋該圖 → 下載 SVG → 在 IcoMoon 用左上 **Import Icons** 上傳。

**選了什麼替代圖請記下來**，Part 2 的替換對照表我會依你的實際選擇調整。

### Step 6. 確認命名

選好後點右下角 **Generate Font** 進入字型頁，逐一檢查每個 icon 下方的名稱。

- 命名會成為 CSS class（`icon-<名稱>`），**請使用小寫、以連字號分隔**。
- 建議直接沿用 FA 的名字去掉 `fa-` 前綴，例如 `fill`、`text-height`、`arrow-trend-up`，這樣 Part 2 的替換最單純。
- 若某個 icon 的預設名稱是別的（例如你用 `tint` 代替 `droplet`），**點名稱可直接改寫**，改成 `droplet` 即可。

### Step 7. 確認設定並下載

在字型頁點右下角 **Preferences（齒輪）**，確認：

| 設定 | 值 |
|---|---|
| Font Name | `icomoon` |
| Class Prefix | `icon-` |
| CSS Selector | `Use attribute selectors` 或 `Use a class`（維持現有專案的寫法即可） |

然後點 **Download**，取得 `icomoon.zip`。

### Step 8. 覆蓋 repo 裡的字型包

解壓縮後，把以下內容覆蓋到 `public/css/icomoon/`：

```
fonts/icomoon.eot
fonts/icomoon.svg
fonts/icomoon.ttf
fonts/icomoon.woff
style.css
selection.json      ← 這個一定要一起更新，下次要再加 icon 時會用到
```

`demo.html`、`demo-files/`、`Read Me.txt` **不要放進去**（它們是 IcoMoon 的示範檔，不該進版控——現有的那份我之後會一併清掉）。

### Step 9. 自我驗證

覆蓋後在瀏覽器直接開 `public/css/icomoon/demo.html`（用你剛解壓縮出來、還沒刪掉的那份），確認：

- 原有的 11 個 icon 都還在、圖案正確（特別確認 `icon-print` 是印表機、`icon-scissors` 是剪刀）
- 新增的 14 個都有出現、名稱如你所設

確認無誤後告訴我，換我接手。

---

## Part 2：我接手的部分（供你了解範圍，不需要你操作）

拿到新字型包後，我會做這些：

### 2-1. 程式碼替換（19 處）

| 檔案 | 行 | 現況 | 改為 |
|---|---|---|---|
| `allEditor.vue` | 5 | `fa-solid fa-fill` | `icon-fill` |
| `allEditor.vue` | 8 | `fa-solid fa-text-height` | `icon-text-height` |
| `message.vue` | 7 | `fa-regular fa-comment fa-fw` | `icon-comment icon-fw` |
| `message.vue` | 23 | `fas fa-times` | `icon-times` |
| `message.vue` | 98 | `fas fa-envelope fa-fw` | `icon-envelope icon-fw` |
| `tableEditor.vue` | 15 | `fa-solid fa-plus fa-fw` | `icon-plus icon-fw` |
| `tableEditor.vue` | 22 | `fa-solid fa-trash-can fa-fw` | `icon-trash icon-fw` |
| `tableEditor.vue` | 38 | `fas fa-fw`（base class） | `icon-fw` |
| `tableEditor.vue` | 51-58 | `icons` 陣列 8 個字串 | 改為 `icon-` 前綴 |
| `tutorial.vue` | 74,75,77,78 | 教學區的 4 個示意 icon | 對應替換 |
| `full.vue` / `type_A.vue` / `type_B.vue` | 25/15/15 | `class="fas text-xs fa-fw"` | `class="text-xs icon-fw"` |

### 2-2. 三個容易被忽略的細節

**`fa-fw`（fixed width）是 Font Awesome 專有的**，IcoMoon 不提供。移除 FA 後 icon 寬度會依圖形而異，導致 `tableEditor` 的按鈕列和表格內的 icon 對不齊。我會在 `src/assets/tailwind.css` 補上等價定義：

```css
.icon-fw {
  width: 1.28571429em;
  text-align: center;
}
```

**`fas` 是 FA 的 base class**（提供 `font-family: "Font Awesome 6 Free"`），IcoMoon 的 `icon-*` class 自帶 font-family，所以 `fas` 要一併移除，不是留著沒事——留著會讓瀏覽器嘗試套用一個已不存在的字型。

**`tableEditor.vue` 的 `icons` 陣列是會被寫進資料的**：使用者點選的 icon class 字串會存進 `MY_STEPS[].icon`，再由 `full/type_A/type_B` 用 `:class="step.icon"` 渲染。所以陣列內容和渲染端的 base class 必須同時改，漏一邊 icon 就不會顯示。（本工具無後端儲存，沒有既有資料需要遷移。）

### 2-3. e2e 測試要同步更新

`e2e/tables.spec.ts` 有三行硬編碼了 `i.fa-star`（第 65、66、73 行），改完 class name 後這個測試會失敗——這正是它該有的反應。我會同步改成 `i.icon-star`。

### 2-4. 清理

- 刪除 `public/css/fontawesome-free-6.2.0-web/`（1.4MB）與 `docs/` 下的同一份
- 移除 `public/index.html` 中 FA 的 `<link rel="prefetch">`
- 順手刪掉 icomoon 的 `demo.html`、`demo-files/`、`Read Me.txt`

### 2-5. 驗證

```bash
yarn test:e2e
```

視覺快照會逐像素比對。**icon 換字型後外觀必然會有差異**，這是預期的——我會目視檢查 diff 圖確認每個 icon 都正確顯示（而不是變成豆腐字或錯位圖形），確認後才更新 baseline。這是本次唯一一個「預期快照會變」的改動。

---

## 回退方式

任何一步出問題：

```bash
rm -rf public/css/icomoon
mv public/css/icomoon.bak public/css/icomoon
git checkout -- src/ public/index.html e2e/
```

程式碼替換的部分都在獨立 commit，`git revert` 也可以。
