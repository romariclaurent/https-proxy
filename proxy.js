var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    httpProxy = require('http-proxy');

var options = {
  https: {
    key: fs.readFileSync('./server.key', 'utf8'),
    cert: fs.readFileSync('./server.crt', 'utf8')
  }
};

//
// Create an instance of HttpProxy to use with another HTTPS server
//
var proxy = new httpProxy.HttpProxy({
  target: {
    host: 'localhost', 
    port: 4000
  }
});

https.createServer(options.https, function (req, res) {
  proxy.proxyRequest(req, res)
}).listen(8002);

