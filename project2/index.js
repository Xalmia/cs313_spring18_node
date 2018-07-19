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
   .get('/', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'login.html')); })
   .get('/main', validateLogin, (req, res) => {res.sendFile(path.join(__dirname, 'public', 'main.html')); })
   .get('/getJournal', getJournal)
   .get('/getSection', getSection)
   .get('/getPage', getPage)
   .get('/getEntries', getEntries)
   .get('/getTextData', getTextData)
   .get('/logout', getLogout)
   .post('/postSection', postSection)
   .post('/postPage', postPage)
   .post('/postEntry', postEntry)
   .post('/postLogin', postLogin)
   .post('/postNewJournal', postNewJournal)
   .delete('/deleteJournal', deleteJournal)
   .listen(PORT, () => {
    console.log("listening on port: " + PORT);
});

/*
    MIDDLEWARE ---------------------------------------------------------------------------------------------
*/

// If the user has a session, allow them to continue! Else, BACK TO THE PITS -- *ahem*... Login...
function validateLogin(req, res, next) {
    if (req.session.hasOwnProperty("username")){
        next()
    } else {
        res.redirect('/');
    }
}

/* 
    GETS ----------------------------------------------------------------------------------------------------
*/

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

function getLogout(req, res) {
    if(req.session.hasOwnProperty("username")){
        req.session.reset();
        res.redirect('/');
    } else {
        res.redirect('/');
    }
}

/*
    POST ------------------------------------------------------------------------------------------------------------
*/

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

    console.log ("login reached with username: " + username);

    pool.query(sql, params, (err, result) => {
        // if the login succeeds, return the main HTML document and set the username as a session variable, if it fails return to login.html?login=0
        // make sure to set the render engine to html.

        if (err != null) {
            console.log("username from input: " + username);
            console.log("An error has occured in login: ");
            console.log(err);
        } else if (result.rows[0] == null){
            console.log("Query is null");
            res.sendFile(path.normalize(__dirname + "/public/login.html"));
        } else {
            req.session.username = username;
            req.session.userId = result.rows[0].user_id;
            filePath = path.normalize(__dirname + "/public/main.html")
            console.log("Attempting redirect to main");
            res.redirect("/main");
        }
    });
}

function postNewJournal(req, res) {
    var journalTitle = req.body.journalTitle;
    var username = req.session.username;
    var userSql = "SELECT user_id FROM user_file WHERE username = $1;";
    var journalSql = "INSERT INTO journal(journal_title) VALUES ($1) RETURNING journal_id;";
    var user_journalSql = "INSERT INTO user_journal(user_fk, journal_fk) VALUES ($1, $2);";
    var userParams = [username];
    var journalParams = [journalTitle];
    var user_journalParams;
    var journalId;
    var userId;

    //initalize the pool ending sequence when the pool is not in use
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        res.json({success: false});
      })

    // This section is nasty, I really should put all these callbacks in their own functions, shame on me.
    pool.connect((err, client, done) => {
        if (err) throw err
        // first get the user ID
        client.query(userSql, userParams, (err, result1) => {

            if (err) {
            console.log("Error in user query: " + err.stack)
            } else {
                userId = result1.rows[0].user_id;
                // next get the insert the journal, and get the new ID with the RETURNS command
                client.query(journalSql, journalParams, (err, result2) => {
                    if (err) {
                        console.log("Error in adding journal " + err.stack);
                    } else {
                        console.log(result2.rows[0]);
                        journalId = result2.rows[0].journal_id;
                        // now that we have all the variables we need, start the final query.
                        user_journalParams = [userId, journalId];
                        client.query(user_journalSql, user_journalParams, (err, result3) => {
                            done();
                            if (err) {
                                // delete the last journal added.
                                console.log(err.stack);
                            } else {
                                res.json({success: true});
                            }
                        });
                    }
                });
            }
        });
    });

    
}

function deleteJournal(request, response) {
    var journalId = request.body.journalId;
    var j_sDeleteSql = "DELETE FROM journal_section WHERE journal_fk = $1";
    var u_jDeleteSql = "DELETE FROM user_journal WHERE journal_fk = $1;";
    var jDeleteSql = "DELETE FROM journal WHERE journal_id = $1;";
    var jDeleteParams = [journalId];

    console.log("Dumping request: ");
    console.log(request.body);

    /* 
    */
   pool.connect((err, client, finished) => {
    if (err) throw err;
        //first try to delete any section constraints
        client.query(j_sDeleteSql, jDeleteParams, (err, result) => {
            if (err){
                console.log("Error deleting the journal_section")
            } else {
                client.query(u_jDeleteSql, jDeleteParams, (err, result) => {
                    if (err) {
                        console.log("Error deleting the user_journal constraint: " + err.stack);
                    } else {
                        // deleting the journals must be the last query for key constraints.
                        client.query(jDeleteSql, jDeleteParams, (err, result) => {
                            if (err) {
                                console.log("Error deleting Journal: " + err.stack);
                                response.json({success: false, data: "cascade"});
                            } else {
                                response.json({success: true});
                            }
                        }); // query to delete journal
                    }
                }); // query to delete user
            }
        }); // query to delete journal_section
   });
}