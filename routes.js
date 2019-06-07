module.exports = function(app) {
    let Book = require("./models/book-model");
    const bodyParser = require("body-parser");
    
    app.use(bodyParser.urlencoded({extended: true})); // parse form submissions
    // app.get('/', (req,res) => {
    //     app.render('home');
    // });

    // REST API Routes
    app.get('/api/v1/books', (req, res) => {
        Book.find({}, (err, books) => {
            if (err) return next(err);
            // res.header("Content-Type",'application/json');
            // res.send(JSON.stringify(books, null, 2));
            
            // res.render('../public/home', {json: true, items: books});
            
            //console.log(books);
            if (books) {
                // res.json sets appropriate status code and response header
                res.json(books);
            } else {
                return res.status(500).send('Error occurred: database error.');
            }
        });
    });
    
    app.get('/api/v1/book/:title', (req, res) => {
        //https://itc230-sp19-cogcodes.c9users.io/api/v1/book/Moby%20Dick
        //console.log(req.params.title); //Moby Dick
        Book.findOne({'title': req.params.title}, (err, book) => {
            if (err) return next(err);
            //res.render('details', {result: book});
            if (book) {
                res.json(book);
            } else {
                return res.status(500).send('Error occurred: database error.');
            }
        });
    });
    
    app.get('/api/v1/book/delete/:title', (req, res) => {
        //https://itc230-sp19-cogcodes.c9users.io/api/v1/book/delete/dune
        //req.params.title
        //let number;
        Book.deleteOne({'title': req.params.title}, (err, book) => {
            if (err) return next(err);
            // Book.countDocuments({}, (err, count) => {
            //     if (err) return next(err);
            //     number = count;
            //     res.render('delete', {title: title, result: item, length: number});
            // });
    // dune entry
    
    // {"_id":"5cf86f8bf634efc6f0a1a277",
    // "title":"dune",
    // "__v":0,"author":"frank herbert",
    // "pubdate":"1970-01-01T00:00:01.963Z"}
    
    
    // log of deletion
    
    // { n: 1,
    //   opTime:
    //   { ts:
    //       Timestamp { _bsontype: 'Timestamp', low_: 1, high_: 1559785428 },
    //      t: 2 },
    //   electionId: 7fffffff0000000000000002,
    //   ok: 1,
    //   operationTime:
    //   Timestamp { _bsontype: 'Timestamp', low_: 1, high_: 1559785428 },
    //   '$clusterTime':
    //   { clusterTime:
    //       Timestamp { _bsontype: 'Timestamp', low_: 1, high_: 1559785428 },
    //      signature: { hash: [Binary], keyId: [Long] } },
    //   deletedCount: 1 }
    
            //console.log(book);
            if (book) {
                res.json(book);
            } else {
                return res.status(500).send('Error occurred: database error.');
            }
        });
    });
    
    app.post('/api/v1/add', (req, res) => {
        let newBook = {'title': req.body.title, 'author': req.body.author, 'pubdate': req.body.pubdate }

        Book.updateOne({'title': req.body.title}, newBook, {upsert:true}, (err, result) => {
            if (err) return next(err);
            //console.log(result.nModified); //update: 1, insert: 0
            
            Book.find({}, (err, items) => {
                if (err) return next(err);
                
                Book.countDocuments({}, (err, count) => {
                    if (err) return next(err);
                    
                    res.render('../public/home', {
                        update: true,
                        status: result.nModified == 1,
                        title: req.body.title,
                        items: items,
                        length: count
                    });
                });
            });
        });
    });
};