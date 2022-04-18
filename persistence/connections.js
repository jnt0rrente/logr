const mysql = require('mysql');

const con = null;

function connect() {
    if (con != null) return con;
    else {
        let con = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        // console.log("Connection details: " + JSON.stringify({
        //     host: process.env.DB_HOST,
        //     port: process.env.DB_PORT,
        //     user: process.env.DB_USER,
        //     password: process.env.DB_PASSWORD,
        //     database: process.env.DB_NAME
        // }));


        con.connect(function(err) {
            if (err) {
                throw err;
            }
        });

        return con;
    }
}

module.exports.connect = connect;