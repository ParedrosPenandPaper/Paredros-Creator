const http = require('http');
const fs = require('fs');

const hostname = '192.168.0.3';
const port = 80;



const server = http.createServer((req, res) => {
  fs.readFile('./dist/index.html', (error, fileContent) => {
    if(error){
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('error - page could not be loaded!');
    }
    else{
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.write(fileContent);
      res.end();
    }
  })
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});