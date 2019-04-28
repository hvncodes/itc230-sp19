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

//
app.get('/get', (req, res) => {
    console.log(req.query); // display parsed querystring object
});

// 
app.post('/get', (req, res) => {
    console.log(req.body); // display parsed form submission
});

// define 404 handler
app.use( (req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

// start server listening for connections
app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Express started'); 
});