const http = require('http');
const { request } = require('https');

const port = '3000';

const server = http.createServer((req, res) => {
  const { method, url } = req;
  console.log(`Method: ${method}`);
  console.log(`URL: ${url}`);

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  } else if (url === '/users' && method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    return res.end(
      '<html><body><ul><li>User1</li><li>User2</li></ul></body></html>'
    );
  } else if (url === '/create-user' && method === 'POST') {
    let body = [];
    req
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        console.log(body);
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
  }
});

server.listen(port, '', () => {
  console.log(`Server running at port: ${port}`);
});
