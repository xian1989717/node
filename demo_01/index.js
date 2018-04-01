let http = require("http");
let fs = require("fs");

http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' });
    fs.createReadStream(__dirname + '/index.html').pipe(res);
}).listen(3000, () => {
    console.log('start');
});