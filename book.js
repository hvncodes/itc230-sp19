let books = [
    { title:"Dune", author:"Frank Herbert", pubdate:1965 },
    { title:"Moby Dick", author:"Herman Melville", pubdate:1851 },
    { title:"The Adventures of Tom Sawyer", author:"Mark Twain", pubdate:1876 },
    { title:"War and Peace", author:"Leo Tolstoy", pubdate:1869 },
    { title:"The Great Gatsby", author:"F. Scott Fitzgerald", pubdate:1925 },
];

// simply returns the array, not any copies or transforms
exports.getAll = () => {
    return books;
};

// returns request book element where element's title matches key
exports.get = (key) => {
    return books.find((book) => {
        return book.title.toLowerCase() === key.toLowerCase()
    }, key);
};

// uses methods findIndex() and splice() to locate and delete array element
// returns deleted array, if any
exports.delete = (key) => {
    // locate index of key
    let index = books.findIndex((book) => {
        return book.title.toLowerCase() === key.toLowerCase()
    });
    
    // It returns index of the first element in a given array that satisfies
    // the provided testing function. Otherwise -1 is returned.
    // splice: If (start is) negative, begins that many elements from the end
    // thus, we check for index being negative or not and decide from there
    // delete array element at index of key
    if (index >= 0) {
        return books.splice(index,1);
    } else { // index = -1
        return undefined;
    }
    
};

exports.add = (key) => {
    let status = "fail";
    if (!module.exports.get(key.title)) { //if doesn't exist
        status = "success"
        books.push(key);
    }
    return status;
};