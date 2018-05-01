let connect = require('connect');
let router = require('./middleware/router');

let routers = {
    GET: {
        '/user': (req, res) => {
            res.end('tobi,loki,ferret');
        },
        '/user/:id': (req, res, id) => {
            res.end('user' + id);
        }
    },
    DELETE: {
        '/user/:id': (req, res, id) => {
            res.end('delete use' + id);
        }
    }
};

connect()
    .use(router(routers))
    .listen(3000);