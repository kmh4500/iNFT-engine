var http = require('http');
const url = require('url');

console.log("mock server started..")

http.createServer(function (req, res) {
  const parsedUrl = url.parse(req.url, true);

  const path = parsedUrl.pathname, query = parsedUrl.query;
  const method = req.method;
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end("hello world");
  console.log(`Request received on: ${path} + method: ${method} + query:
  ${JSON.stringify(query)}`);
}).listen(5000);
