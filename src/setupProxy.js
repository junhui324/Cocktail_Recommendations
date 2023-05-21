const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/req/address', {
      target: 'https://api.vworld.kr',
      changeOrigin: true,
    })
  );
};
