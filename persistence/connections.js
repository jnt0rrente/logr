const mysql = require('mysql');

const con = null;

function connect() {
    console.log("Attempting to connect to database: " + process.env.DB_NAME)
    if (con != null) return con;
    else {
        let con = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        con.connect(function(err) {
            if (err) {
                console.error("Could not connect to database. Aborting.");
                throw new Error();
            } else {
                console.log("Connected to database.")
            }
        });

        return con;
    }
}

module.exports.connect = connect;