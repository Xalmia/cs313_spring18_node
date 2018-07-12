var express = require('express');
var app = express()
var controller = require('./controllers/scriptureController.js');
var PORT = process.env.PORT || 5000;

app.set("port", PORT)
   .use(express.static(__dirname + "/public"))
   .get("/scriptures", controller.handleScripReq) // Handle Scripture Request
   .listen(PORT, () => {
        console.log("Listening on port: ", PORT);
   });


   