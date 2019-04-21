# itc230-sp19
ITC 230 - Advanced Javascript

notes:


var myFunction = function(book) {
	return book.title === key;
};
var index = books.findIndex(myFunction);


var index = books.findIndex(function(book) {
	return book.title === key;
});


var index = books.findIndex((book) => {
	return book.title === key;
});


/*
let foundIndex = students.findIndex((student) => {
    return student.name === 'mary';
});
*/

