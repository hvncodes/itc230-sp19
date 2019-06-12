'use strict'
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('port', process.env.PORT || 3000); // used as app.get('port')
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

let Book = require("./models/book-model");

let routes = require('./routes.js')(app); // pass ‘app’ instance to the routes module

app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route

// renders home page with inventory
app.get('/', (req, res) => {
    res.type('text/html');

    // return all records
    Book.find({}, (err, items) => {
        if (err) return next(err);
        res.render('../public/home', {items: JSON.stringify(items)});
    });
});

// send plain text response
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About page');
});

// POST method via form submission, form action leads to detail
app.post('/detail', (req, res) => {
    let title = req.body.title;
    
    // return a single record
    Book.findOne({'title': title}, (err, item) => {
        if (err) return next(err);
        res.render('details', {result: item});
    });
});

// GET method via home
app.get('/detail', (req, res) => {
    let title = req.query.title;
    
    // return a single record
    Book.findOne({'title': title}, (err, item) => {
        if (err) return next(err);
        res.render('details', {result: item});
    });
});

// GET method via details 
app.get('/delete', (req,res) => {
    let title = req.query.title;
    let number;
    
    Book.deleteOne({'title': title}, (err, item) => {
        if (err) return next(err);
        Book.countDocuments({}, (err, count) => {
            if (err) return next(err);
            number = count;
            res.render('delete', {title: title, result: item, length: number});
        });
    });
});

// define 404 handler
app.use( (req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

// start server listening for connections
app.listen(process.env.PORT, process.env.IP, () => {
    // console.log('Express started'); 
});