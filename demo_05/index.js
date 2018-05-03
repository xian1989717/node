let connect = require('connect');
let app = connect();
app.use(logger);

app.use(hello);
app.listen(3000);

function hello(req, res) {
    res.setHeader('content-type', 'text/plain');
    res.end('hello world');
}

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
};

function setup(format) {
    let regexp = /:(\w+)/g;
    return function logger(req, res, next) {
        let str = format.replace(regexp, (match, property) => {
            return req(property);
        });
        console.log(str);
        next();
    }
}