const http = require("http");
http.createServer((req, res) => {
    const path = req.url.toLowerCase();
    var book = require("./lib/book.js");
    switch (path) {
        case '/':
            const fs = require("fs");
            fs.readFile("public/home.html", (err, data) => {
                if (err) return console.error(err);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data.toString());
            });
            break;
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('About page');
            break;
        case '/get':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('GET');
            break;
        case '/delete':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('DEL');
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found');
            break;
    }
}).listen(process.env.PORT || 3000);