var express = require('express');
var app = express();
var path = require('path');
var PORT = process.env.PORT || 5000

const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || "postgres://journal_user:journal_pass@localhost:5432/journal"
const pool = new Pool({connectionString: connectionString});

app.set('port', PORT)
   //.get('/', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'login.html'));})
   .get('/getJournal', getJournal)
   .get('/getSection', getSection)
   .get('/getPage', getPage)
   .post('/postJournal', postJournal)
   .post('/postSection', postSection)
   .post('/postPage', postPage)
   .put('/putJournal', putJournal)
   .put('/putSection', putSection)
   .put('/putPage', putPage)
   .listen(PORT, () => {
    console.log("listening on port: " + PORT);
});

function getJournal(req, res) {
    res.render("Getting Journal information to DB");
}

function getSection(req, res) {
    res.render("Getting Section information to DB");
}

function getPage(req, res) {
    res.render("Getting Page information to DB");
}

function postJournal(req, res) {
    
    res.render("Posting Journal information to DB");
}

function postSection(req, res) {
    res.render("Posting Section information to DB");
    
}

function postPage(req, res) {
    res.render("Posting Page information to DB");
}

function putJournal(req, res) {
    res.render("Modifying Journal information in DB!");
}

function putSection(req, res) {
    res.render("Modifying Section information in DB!");
}

function putPage(req, res) {
    res.render("Modifying Page information in DB!");
}