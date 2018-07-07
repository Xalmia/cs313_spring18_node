var express = require('express');
var app = express();
var path = require('path');
var PORT = process.env.PORT || 5000
var methodOverride = require('method-override');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || "postgres://journal_user:journal_pass@localhost:5432/journal"
const pool = new Pool({connectionString: connectionString});

app.set('port', PORT)
   .use(methodOverride('_method'))
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
    userId = req.query.id;
    // TODO: This query needs to be joined with the User table though the user_journal table
    var query = "SELECT user_file.user_id, journal.journal_id, journal.journal_title FROM user_file" +
    " INNER JOIN user_journal ON user_file.user_id = user_journal.user_fk AND user_journal.user_fk = $1" +
    " INNER JOIN journal ON user_journal.journal_fk = journal.journal_id;";
    var params = [userId];

    pool.query(query, params, (err, result) => {
        if (err || result == null) {
            console.log("Error making Query: " + err);
            res.json({success: false, data:err});
        } else {
            console.log("Found result: " + JSON.stringify(result));
            res.json(result);
        }
    });
}

function getSection(req, res) {
    journalId = req.query.journalId;
    var query = "SELECT journal.journal_id, section_in_journal.section_id, section_in_journal.section_title FROM journal" +
    " INNER JOIN journal_section ON journal.journal_id = journal_section.journal_fk AND journal_section.section_fk = $1" +
    " INNER JOIN section_in_journal ON journal_section.section_fk = section_in_journal.section_id;"; 
    var params = [journalId];

  
    pool.query(query, params, (err, result) => {
        if (err || result == null){
            console.log("Error getting section: " + error);
            res.json({success: false, data:err});
        } else {
            console.log("Found result: " + JSON.stringify(result));
            res.json(result);
        }
    });
}

function getPage(req, res) {
    sectionId = req.query.sectionId;
    var query = "SELECT section_in_journal.section_id, page_in_journal.page_id, page_in_journal.page_title FROM section_in_journal" +
    " INNER JOIN section_page ON section_in_journal.section_id = section_page.section_fk AND section_page.section_fk = $1" +
    " INNER JOIN page_in_journal ON section_page.section_fk = page_in_journal.page_id;"; 
    var params = [sectionId];
  
    pool.query(query, params, (err, result) => {
        if (err || result == null){
            console.log("Error getting section: " + error);
            res.json({success: false, data:err});
        } else {
            console.log("Found result: " + JSON.stringify(result));
            res.json(result);
        }
    });
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