module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/shai3-nai1-translator/'
    : '/',
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/app.scss";'
      }
    }
  }
}
