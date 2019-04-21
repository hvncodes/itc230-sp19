const http = require("http");
const querystring = require('querystring');
http.createServer((req, res) => {
    var books = require("./book.js");
    //console.log("Initiate get():");
    //console.log(books.get("Moby Dick"));
    //console.log("Initiate getAll()():");
    console.log(books.getAll());
    console.log("Initiate delete():");
    console.log(books.delete("War and Peace"));
    console.log("Array after deletion:");
    console.log(books.getAll());
    console.log(req.url);
    //https://itc230-sp19-cogcodes.c9users.io/?hello=worlds
    //req.url.toLowerCase()
    var url = req.url.split("?");
    var q = querystring.parse(url[1]);
    var path = url[0].toLowerCase();
    console.log("q: ");
    console.log(q);
    console.log("q.title: " + q.title);
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
            console.log("testing: ");
            console.log(books.get(q.title));
            var qvalue = books.get(q.title)
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify(qvalue));
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
