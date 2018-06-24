const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mail.html'));
})

app.get('/getPackage', (req, res) => {


  // get the variables from the request header
  var weight = Number(req.query.weight);
  var mailType = req.query.type;

  console.log("Weight: " + weight);
  console.log("Mail Type: " + mailType);
  
  handlePackage(res, weight, mailType);
}) 

app.listen(PORT, (req, res) => {
  console.log("Listening on port" + PORT);
})

function handlePackage(res, weight, mailType){
  var result = findPrice(mailType, weight);

  var params = {mailType: mailType, weight: weight, result: result};

  res.render(path.normalize("pages/result"), params);
}

function findPrice(mailType, num){
  var result = 0.0;

  if (mailType == "Letters (Stamped)"){
    if (num < 1){
    result = .5;
    } else if (num < 2) {
      result = .71;
    } else if (num < 3) {
      result = .92;
    } else if (num < 3.5) {
      result = 1.13;
    }
    else {
      return 0;
    }
  } else if ("Letters (Metered)"){
    if (num < 1){
      result = .47;
      } else if (num < 2) {
        result = .68;
      } else if (num < 3) {
        result = .92;
      } else if (num < 3.5) {
        result = 1.10;
      }
      else {
        result = 0;
      }
  } else if ("Large Envelopes (Flats)"){
    if (num < 1){
      result = 1.0;
      } else if (num < 2) {
        result = 1.21
      } else if (num < 3) {
        result = 1.42
      } else if (num < 4) {
        result = 1.36
      } else if (num < 5) {
        result = 1.84
      } else if (num < 6) {
        result = 2.05
      } else if (num < 7) {
        result = 2.26
      } else if (num < 8) {
        result = 2.47
      } else if (num < 9) {
        result = 2.68
      } else if (num < 10) {
        result = 2.89
      } else if (num < 11) {
        result = 3.10
      } else if (num < 12) {
        result = 3.31
      } else if (num < 13) {
        result = 3.52
      } else {
        return 0;
      }
  } else if ("First-Class Package Service--Retail"){
      if (num < 4) {
        result = 3.5
      } else if (num < 8) {
        result = 3.75
      } else if (num < 9) {
        result = 4.10
      } else if (num < 10) {
        result = 4.45
      } else if (num < 11) {
        result = 4.80
      } else if (num < 12) {
        result = 5.15
      } else if (num < 13) {
        result = 5.50
      } else {
        return 0;
      }
  } else {
    // Something is wrong, report and display the error.
    console.log("There was an error in the response.");
  }

  return result;
}

/*
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))*/
