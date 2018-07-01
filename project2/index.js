var express = require('express');
var app = express();
var path = require('path');
var PORT = process.env.PORT || 5000

const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || "postgres://journal_user:journal_pass@localhost:5432/journal"
const pool = new Pool({connectionString: connectionString});

app.set('port', PORT)
   .get('/', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'login.html'));})
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

// since there is no EJS to render JUST yet, just use the json display engine
function getJournal(req, res) {
    res.json({get: "success", type: "journal"});
}

function getSection(req, res) {
    res.json({get: "success", type: "section"});
}

function getPage(req, res) {
    res.json({get: "success", type: "page"});
}

function postJournal(req, res) {
    res.json({post: "success", type: "journal"});
}

function postSection(req, res) {
    res.json({post: "success", type: "section"});
}

function postPage(req, res) {
    res.json({post: "success", type: "page"});
}

function putJournal(req, res) {
    res.json({put: "success", type: "journal"});
}

function putSection(req, res) {
    res.json({put: "success", type: "section"});
}

function putPage(req, res) {
    res.json({put: "success", type: "page"});
}