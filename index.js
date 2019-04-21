const http = require("http");
const querystring = require('querystring');
http.createServer((req, res) => {
    var books = require("./book.js");
    console.log(books.getAll());
    // req.url = /get?hello=world
    // after split: [ '/get', 'title=dune' ]
    var url = req.url.split("?");
    var q = querystring.parse(url[1]);
    var path = url[0];
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
            var qvalue = books.get(q.title);
            var text;
            if (qvalue !== undefined) {
                text = JSON.stringify(qvalue);
            } else {
                text = "Not found."
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(text);
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
