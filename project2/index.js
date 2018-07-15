var express = require('express');
var app = express();
var path = require('path');
var PORT = process.env.PORT || 5000
var methodOverride = require('method-override');
var session = require('client-sessions');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || "postgres://journal_user:journal_pass@localhost:5432/journal"
const pool = new Pool({connectionString: connectionString});

app.set('port', PORT)
   .use(methodOverride('_method'))
   .use(express.json())
   .use(express.urlencoded())
   .use(express.static(__dirname + "/public"))
   .use(session({
    cookieName: 'session',
    secret: "Super-secret1212",
    duration: 30 * 60 * 1000
    }))
   .get('/', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'login.html'));})
   .get('/getJournal', getJournal)
   .get('/getSection', getSection)
   .get('/getPage', getPage)
   .get('/getEntries', getEntries)
   .get('/getTextData', getTextData)
   .post('/postJournal', postJournal)
   .post('/postSection', postSection)
   .post('/postPage', postPage)
   .post('/postEntry', postEntry)
   .post('/postLogin', postLogin)
   .put('/putJournal', putJournal)
   .put('/putSection', putSection)
   .put('/putPage', putPage)
   .listen(PORT, () => {
    console.log("listening on port: " + PORT);
});

// since there is no EJS to render JUST yet, just use the json display engine
function getJournal(req, res) {
    userId = req.session.userId;
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
            console.log("Found result: " + JSON.stringify(result.rows));
            res.json(result.rows);
        }
    });
}

function getSection(req, res) {
    journalId = req.query.journalId;

    console.log(journalId);

    var query = "SELECT journal.journal_id, section.section_id, section.section_title FROM journal" +
    " INNER JOIN journal_section ON journal.journal_id = journal_section.journal_fk AND journal_section.journal_fk = $1" +
    " INNER JOIN section ON journal_section.section_fk = section.section_id;"; 
    var params = [journalId];

  
    pool.query(query, params, (err, result) => {
        if (err || result == null){
            console.log("Error getting section: " + err);
            res.json({success: false, data:err});
        } else {
            console.log("Found result: " + JSON.stringify(result.rows));
            res.json(result.rows);
        }
    });
}

function getPage(req, res) {
    sectionId = req.query.sectionId;
    var query = "SELECT section.section_id, page_in_section.page_id, page_in_section.page_title FROM section" +
    " INNER JOIN section_page ON section.section_id = section_page.section_fk AND section_page.section_fk = $1" +
    " INNER JOIN page_in_section ON section_page.page_fk = page_in_section.page_id;"; 
    var params = [sectionId];

    pool.query(query, params, (err, result) => {
        if (err || result == null){
            console.log("Error getting section: " + err);
            res.json({success: false, data:err});
        } else {
            console.log("Found result: " + JSON.stringify(result.rows));
            res.json(result.rows);
        }
    });
}

function getEntries(req, res) {
    pageId = req.query.pageId;
    var query = "SELECT page_in_section.page_id, text_box.text_box_id FROM page_in_section" +
    " INNER JOIN page_text ON page_in_section.page_id = page_text.page_fk AND page_text.page_fk = $1" +
    " INNER JOIN text_box ON page_text.text_fk = text_box.text_box_id;"; 
    var params = [pageId];

    pool.query(query, params, (err, result) => {
        if (err || result == null){
            console.log("Error getting section: " + err);
            res.json({success: false, data:err});
        } else {
            console.log("Found result: " + JSON.stringify(result.rows));
            res.json(result.rows);
        }
    });
}

function getTextData(req, res) {
    textBoxId = req.query.textBoxId;
    pageId = req.query.pageId;
    var query = "SELECT text_box.text_content, page_in_section.page_title FROM text_box" + 
                " INNER JOIN page_in_section ON page_in_section.page_id = $2 WHERE text_box.text_box_id = $1;";
    params = [textBoxId, pageId];
    pool.query(query, params, (err, result) => {
        if (err || result == null){
            console.log("Error getting section: " + err);
            res.json({success: false, data:err});
        } else {
            console.log("Found result: " + JSON.stringify(result.rows));
            res.json(result.rows);
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

function postEntry(req, res) {
    var entryId = req.body.textBoxId;
    var textValue = req.body.textValue;
    var sql = "UPDATE text_box SET text_content = $1 WHERE text_box_id = $2::int;";
    var params = [textValue, entryId];

    pool.query(sql, params, (err, result) => {
        console.log(result);
        if (err == null){
            res.json({success: true});
        } else {
            res.json({success: false});
        }
    });

}

function postLogin(req, res) {

    var username = req.body.username;
    var password = req.body.password;
    var sql = "SELECT user_id FROM user_file WHERE username = $1 AND user_password = $2;";
    var params = [username, password];
    pool.query(sql, params, (err, result) => {
        // if the login succeeds, return the main HTML document and set the username as a session variable, if it fails return to login.html?login=0
        // make sure to set the render engine to html.

        if (err != null) {
            console.log("An error has occured: " + err);
        } else if (result.rows[0] == null){
            console.log("Query is null");
            res.sendFile(path.normalize(__dirname + "/public/login.html"));
        } else {
            req.session.username = username;
            req.session.userId = result.rows[0].user_id;

            res.sendFile(path.normalize(__dirname + "/public/main.html"));
        }
    });
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

