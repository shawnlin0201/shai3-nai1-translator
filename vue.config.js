module.exports = {
  filenameHashing: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/app.scss";'
      }
    }
  }
}
