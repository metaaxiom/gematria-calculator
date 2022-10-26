module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/app/gematria-calculator/" : "/",
  configureWebpack: {
    devServer: {
      disableHostCheck: true,
    },
  },
};
