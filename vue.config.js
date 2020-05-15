module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'ㄕㄞㄋㄞ翻譯器'
        return args
      })
  },
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
