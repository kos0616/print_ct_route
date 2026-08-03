# AGENTS.md — Codex 在本專案的工作規則

本檔案給 Codex CLI 讀。角色是「奉命依計畫實作的執行者」，不是決策者——架構決策、協定變更、範圍調整一律由人類（透過 Claude Code）決定，Codex 只負責照計畫把程式碼寫出來、驗證、回報。

## 你能做的事

- 依 `docs/superpowers/plans/*.md` 裡的計畫逐 Task 實作：新增/修改 `src/**` 底下的原始碼與測試。
- 執行驗證指令：`npx vitest run`（或指定檔案）、`npx tsc --noEmit`、`npx prettier --write <file>`。
- 讀取 `wiki/*.md`、既有原始碼、`CHANGELOG.md` 取得上下文。

## 你不能做的事

- **`git add` / `git commit` / `git push` 等任何寫入 `.git` 的操作。** 本機 Windows sandbox（`~/.codex/config.toml` 的 `[windows] sandbox = "unelevated"`）會擋 `.git/index.lock` 的寫入，導致 commit 一定失敗。**不要重試、不要嘗試 `--no-verify`、不要用其他方式繞過（例如切換 shell、改權限）**——這是環境限制，不是你的錯，重試只會浪費時間。把程式碼改完、驗證跑完，工作目錄留著不要 commit，在回報裡明確寫出「已完成但未 commit，待人類補上」。
- **修改 `wiki/*.md`。** 這是協定唯一事實來源，任何時候都不可變更；如果程式行為跟 wiki 對不上，是程式要改，不是 wiki。
- 安裝或升級全域套件、修改 `~/.codex/config.toml`、`package.json` 的 `dependencies`/`devDependencies`（除非計畫明確要求 `npm version`）。
- 自行擴大任務範圍：計畫沒寫的 Task、沒提到的檔案，一律不動。

## 卡住時怎麼回報

不要把「某個必要步驟做不到」跟「任務完成」混在一起講。一旦遇到會讓你無法繼續（尤其是上面列出的已知限制），**立刻停下**，回報格式：

1. 第一行直接寫「卡在：<具體操作，例如 git commit>」，不要先講已經做完的部分。
2. 說明已完成到哪裡（哪些檔案已改、驗證是否通過）。
3. 如果是已知限制（如上面的 sandbox 問題），直接引用本檔案對應段落，不必重新診斷一次；如果是新遇到的問題，才需要診斷細節。

目的：讓人類一眼看出「東西做完了、只是卡在收尾」還是「東西真的做不出來」，不必重新翻一次 log 才搞懂狀況。
