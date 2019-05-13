'use strict'
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('port', process.env.PORT || 3000); //used as app.get('port')
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

let Book = require("./models/book-model");
//let books = require("./book.js");
//console.log(books);
/*
{ getAll: [Function],
  get: [Function],
  delete: [Function],
  add: [Function] }
*/
// send static file as response
app.get('/', (req, res) => {
    res.type('text/html');
    //res.sendFile(__dirname + '/public/home.html');
    
    // insert back a single record (test: 'dune' in delete case)
    var newBook = {'title':'dune', 'author':'frank herbert', 'pubdate': 1963 }
    Book.updateOne({'title':'dune'}, newBook, {upsert:true}, (err, result) => {
      if (err) return next(err);
      // console.log(result);
      // other code here
    });
    
    // return all records
    Book.find({}, (err, items) => {
        if (err) return next(err);
        // console.log(items.length);
        // console.log(items);
        // other code here
        res.render('../public/home', {items: items});
    });
});

// send plain text response
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About page');
});

// POST method via form submission, form action leads to detail
app.post('/detail', (req, res) => {
    // console.log(req.body); // display parsed form submission
    let title = req.body.title;
    // let result = books.get(title);
    // res.render('details', {title: title, result: result});
    
    // return a single record
    Book.findOne({'title': title}, (err, item) => {
        if (err) return next(err);
        // console.log(item);
        // { _id: 5cc7a69e1c9d44000068f389,
        //   title: 'Moby Dick',
        //   author: 'Herman Melville',
        //   pubdate: 1851-01-01T00:00:00.000Z }
        // other code here
        res.render('details', {result: item});
    });
});

// GET method via home
app.get('/detail', (req, res) => {
    // console.log(req.query); // display parsed querystring object
    let title = req.query.title;
    
    // return a single record
    Book.findOne({'title': title}, (err, item) => {
        if (err) return next(err);
        // console.log(item);
        // other code here
        res.render('details', {result: item});
    });
});

// GET method via details 
app.get('/delete', (req,res) => {
    //console.log(req.query); // display parsed querystring object
    let title = req.query.title;
    // let result = books.delete(title);
    // res.render('delete', {title: title, result: result, length: books.getAll().length});
    var number = 1;
    Book.deleteOne({'title': title}, (err, item) => {
        if (err) return next(err);
        console.log('num first: '+number); //1
        Book.countDocuments({}, (err , count) => {
            if (err) return next(err);
            number = count;
            console.log('num inside: '+number); //5
            res.render('delete', {title: title, result: item, length: number});
        });
        //console.log('num outside: '+number); //still 1???
        //scope issues
        //res.render('delete', {title: title, result: item, length: number});
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
    //console.log('Express started'); 
});