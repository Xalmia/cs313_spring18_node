const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000

var app = express();

app.get('/', (res, req) => {
  req.sendFile(path.join(__dirname, 'public', 'mail.html'));
})

app.get('/getPackage', (res, req) => {
  req.send("Hello there.");
}) 

app.listen(PORT, (res, req) => {
  console.log("Listening on port" + PORT);
})
/*
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))*/
