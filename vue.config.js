module.exports = {
  publicPath: "./",
  outputDir: "dist",
  productionSourceMap: false,

  devServer: {
    port: 3020,
    proxy: 'http://xxx.com'
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
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
