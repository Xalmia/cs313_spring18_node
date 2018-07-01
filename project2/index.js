var express = require('express');
var app = express();

var PORT = process.env.PORT || 5000

const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || "postgres://journal_user:journal_pass@localhost:5432/journal"
const pool = new Pool({connectionString: connectionString});

app.get('/', (req, res) => {res.render("Hello");})
   .listen(PORT, () => {
    console.log("listening on port: " + PORT);
});