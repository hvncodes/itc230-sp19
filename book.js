var books = [
    { title:"Dune", author:"Frank Herbert", pubdate:1965 },
    { title:"Moby Dick", author:"Herman Melville", pubdate:1851 },
    { title:"The Adventures of Tom Sawyer", author:"Mark Twain", pubdate:1876 },
    { title:"War and Peace", author:"Leo Tolstoy", pubdate:1869 },
    { title:"The Great Gatsby", author:"F. Scott Fitzgerald", pubdate:1925 },
];

//simply returns the array, not any copies or transforms
exports.getAll = function() {
    return books;
};

//returns request book element where element's title matches key
exports.get = function(key) {
    var myFunction = function(book) {
        return book.title.toLowerCase() === key.toLowerCase();
    };
    return books.find(myFunction, key);
};

//uses methods findIndex() and splice() to locate and delete array element
exports.delete = function(key) {
    //locate index of key
    var myFunction = function(book) {
        return book.title.toLowerCase() === key.toLowerCase();
    };
    var index = books.findIndex(myFunction);
    //delete array element at index of key
    return books.splice(index,1);
};