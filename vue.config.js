const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  outputDir: "docs",
  publicPath: process.env.NODE_ENV === "production" ? "/print_ct_route/" : "/",
});
