var books = [
    //var person = {firstName:"John", lastName:"Doe", age:46};
    { title:"Dune", author:"Frank Herbert", pubdate:1965 },
    { title:"Moby Dick", author:"Herman Melville", pubdate:1851 },
    { title:"The Adventures of Tom Sawyer", author:"Mark Twain", pubdate:1876 },
    { title:"War and Peace", author:"Leo Tolstoy", pubdate:1869 },
    { title:"The Great Gatsby", author:"F. Scott Fitzgerald", pubdate:1925 },
];

exports.getAll = function() {
    // books.map( function(item) {
    //     return { title : item.title, author : item.author, pubdate : item.pubdate }
    // });
    return books.slice();
};

//exports.myHandler = function(event, context, callback) {   
    //... function code   
    //callback(null, "some success message");
   // or 
   // callback("some error type"); 
//}

exports.get = function(key) {
    var myVar = key;
    var myFunction = function(book) {
        return book.title === myVar;
    };
    return books.find(myFunction, myVar);
};

exports.delete = function(n) {
    return books.splice(n,1);
};

//working
// var myVar = "The Great Gatsby";
// var myFunction = function(book) {
//     return book.title === myVar;
// };
// console.log(books.find(myFunction, myVar));