module.exports = {
  publicPath: "./",
  outputDir: "dist",
  productionSourceMap: false,

  devServer: {
    port: 3020
  },
  configureWebpack: {
    // 把webpack的配置写在这里 会自动合并
    // 以下库使用cdn，不会被打包
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      axios: "axios"
    }
  },
  css: {
    loaderOptions: {
      stylus: {
        "resolve url": true,
        import: ["./src/theme"]
      }
    }
  },
  pluginOptions: {
    "cube-ui": {
      postCompile: true,
      theme: true
    }
  }
};
