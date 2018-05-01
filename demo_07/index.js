let connect = require('connect');
let logger = require('morgan');
let fs = require('fs');
let log = fs.createWriteStream(__dirname + '/var/log/myapp.log', { flags: 'a' });

let app = connect()
    .use(logger({ format: ':method :url', stream: log }))
    .use(connect.favicon(__dirname + '/public/favicn.ico'))
    .use(hello)
    .listen(3000);

function hello(req, res) {
    res.setHeader('content-type', 'text/plain');
    res.end('hello world');
}