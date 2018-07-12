function getScripFromDb(book, callback) {
    // if book is null, get everything.

    // else get that book.
    if (book){
        //get this book's scriptures
        query = "SELECT book, chapter, verse, text FROM scripture WHERE book = $1";
        result = {success: true, data: [
            {book: "2 Nephi", chapter: 2, verse: 25, text: "Adam fell..."},
            {book: "Matthew", chapter: 5, verse: 16, text: "Let your Light..."},
            {book: "1 Nephi", chapter: 2, verse: 15, text: "And my father dwelt in...."}
         ]};
    }
    else {
        // get all scriputres
        query = "SELECT * FROM scripture";
    }
    
    callback(null, result)
}

module.exports = {
    getScripFromDb: getScripFromDb
};