const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    proxy('https://angat-demo.herokuapp.com/api/v1/user', {
      target: 'https://angat-demo.herokuapp.com/api/v1/user',
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    proxy('https://angat-demo.herokuapp.com/api/v1/payments/unionbank', {
      target: 'https://angat-demo.herokuapp.com/api/v1/payments/unionbank',
      secure: false,
      changeOrigin: true,
    })
  );
};
