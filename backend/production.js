const http = require('http');

module.exports = {
  create: function (app) {
    return http.createServer(app);
  },
  listen: function (http) {
    return http.listen(8080, function () {
      console.log('server is connected');
    });
  }
};