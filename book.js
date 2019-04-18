var books = [
    //var person = {firstName:"John", lastName:"Doe", age:46};
    { title:"Dune", author:"Frank Herbert", pubdate:1965 },
    { title:"Moby Dick", author:"Herman Melville", pubdate:1851 },
    { title:"The Adventures of Tom Sawyer", author:"Mark Twain", pubdate:1876 },
    { title:"War and Peace", author:"Leo Tolstoy", pubdate:1869 },
    { title:"The Great Gatsby", author:"F. Scott Fitzgerald", pubdate:1925 },
];

function getAll() {
    // books.map( function(item) {
    //     return { title : item.title, author : item.author, pubdate : item.pubdate }
    // });
    return books.slice();
};

exports.myHandler = function(event, context, callback) {   
    ... function code   
    callback(null, "some success message");
   // or 
   // callback("some error type"); 
}

function get(key) {
    var myVar = key;
    var myFunction = function(book) {
        return book.title === myVar
    };
    books.find(myFunction, myVar);
};

function del(n) {
    return books.splice(n,1);
};

console.log(books.get("War and Peace"));

//working
var myVar = "The Great Gatsby";
var myFunction = function(book) {
    return book.title === myVar;
};
console.log(books.find(myFunction, myVar));