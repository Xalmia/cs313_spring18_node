var model = require("./../models/scriptureModel.js");

   function handleScripReq(req, res){
    var book = req.query.book;
    //TODO: check the book variable for security flaws.
    console.log("Requesting book:" + book);
    model.getScripFromDb(book, (err, result) =>{
         if (err){
             console.log("An error occured trying to get book: " + book);
             res.status("500").json({success: false, data: err})
         }
         else {
             res.json(result);
         }
    });
}

module.exports = {
    handleScripReq: handleScripReq
};