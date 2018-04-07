let http = require('http');
let qs = require('querystring');
let items = [];

let server = http.createServer((req, res) => {
    if ('/' == req.url) {
        switch (req.method) {
            case 'GET':
                show(res);
                break;
            case 'POST':
                add(req, res);
                break;
            default:
                badRequest(res);
        }
    } else {
        notFound(res);
    }
});

server.listen(3000);

function show(res) {
    let html = '<html><head><title>Todo List</title></head><body>' +
        '<h1>Todo List</h1>' +
        '<ul>' +
        items.forEach((item) => {
            return '<li>' + item + '</li>'
        }) +
        '</ul>' +
        '<form method="post" action="/">' +
        '<p><input type="text" name="item"/></p>' +
        '<p><input type="submit" value = "Add Item"/></p>' +
        '</form></body></html>';
    res.setHeader('content-type', 'text/html');
    res.setHeader('content-length', Buffer.byteLength(html));
    res.end(html);
}

function notFound(res) {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('Not Found');
}

function badRequest(res) {
    res.writeHead(400, { 'content-type': 'text/plain' });
    res.end('Bad Request');
}

function add(req, res) {
    let body = '';
    req.setEncoding('utf-8');
    req.on('data', (chuck) => {
        body += chuck;
    });
    req.on('end', (chuck) => {
        let obj = qs.parse(body);
        items.push(obj.item);
        show(res);
    });
}