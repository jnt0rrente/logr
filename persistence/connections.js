const mysql = require('mysql');
const con = null;

module.exports.connect = function(app) {
    console.log("Attempting to connect to database: " + process.env.DB_NAME)
    if (con != null) return con;
    else {
        let config = app.get("config");
        let con = mysql.createConnection({
            host: config.database.address,
            port: config.database.port,
            database: config.database.name,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
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