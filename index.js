'use strict'
const express = require("express");
const bodyParser = require("body-parser")
const app = express();

app.set('port', process.env.PORT || 3000); //used as app.get('port')
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

var books = require("./book.js");

// send static file as response
app.get('/', (req, res) => {
    res.type('text/html');
    res.sendFile(__dirname + '/public/home.html'); 
});

// send plain text response
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About page');
});

// POST method via form submission, form action leads to detail, 
app.post('/detail', (req, res) => {
    //console.log(req.body); // display parsed form submission
    var title = req.body.title;
    var result = books.get(title);
    res.render('details', {title: title, result: result});
});

// GET method via details 
app.get('/delete', (req,res) => {
    //console.log(req.query); // display parsed querystring object
    var title = req.query.title
    var result = books.delete(title);
    res.render('delete', {title: title, result: result, length: books.getAll().length});
});

// define 404 handler
app.use( (req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

// start server listening for connections
app.listen(process.env.PORT, process.env.IP, () => {
    //console.log('Express started'); 
});