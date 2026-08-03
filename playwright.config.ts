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
    // 直接呼叫本地 binary：避開 npm/npx/yarn 在 Windows 上的 .cmd shim 差異與網路取包
    command: "node node_modules/@vue/cli-service/bin/vue-cli-service.js serve",
    url: "http://localhost:8080",
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
