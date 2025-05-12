const { defineConfig } = require("@vue/cli-service");

process.env.VUE_APP_VERSION = process.env.npm_package_version;

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  outputDir: "docs",
  publicPath: process.env.NODE_ENV === "production" ? "/print_ct_route/" : "/",
});
