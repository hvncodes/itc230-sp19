const http = require("http");
const querystring = require('querystring');
const fs = require("fs");
http.createServer((req, res) => {
    var books = require("./book.js");
    // console.log(books.getAll());
    // req.url = /get?hello=world
    // after split: [ '/get', 'title=dune' ]
    var url = req.url.split("?");
    var q = querystring.parse(url[1]); // example: '/get'
    var path = url[0]; // example: 'title=dune'
    
    switch (path) {
        case '/':
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
            var qvalue = JSON.stringify(books.get(q.title));
            var text;
            if (qvalue !== undefined) {
                text = qvalue;
            } else {
                text = "Not found."
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(text);
            break;
        case '/delete':
            //var oldBooksLength = Object.keys(books.getAll()).length;
            var deleted = JSON.stringify(books.delete(q.title));
            //var newBooksLength = Object.keys(books.getAll()).length;
            var message;
            if (deleted !== undefined) {
                message = q.title + " removed";
            } else {
                message = q.title + " not removed"
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(message);
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found.');
            break;
    }
}).listen(process.env.PORT || 3000);
