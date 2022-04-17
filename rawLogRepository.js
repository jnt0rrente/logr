const mysql = require('mysql');

function getRepo() {
    let con = connect();
    return new RawLogRepository(con);
}

class RawLogRepository {
    constructor(connection) {
        this.connection = connection;
    }

    create(log) {
        let body = log.body;
        let timestamp = log.timestamp;
        let query = "insert into rawLog (body, timestamp) VALUES (?,?)";
        this.connection.query(query, [body, timestamp], function(err, result, fields) {
            if (err) throw err;
            console.log(`inserted raw log: {body: ${body}, timestamp: ${timestamp}}`)
        });
    }

    listAll() {
        let query = "select * from rawLog;";
        this.connection.query(query, function(err, result, fields) {
            if (err) throw err;
            console.log("result:");
            console.log(result);
        });
        z
    }
}

function connect() {
    let con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    con.connect(function(err) {
        if (err) {
            throw err;
        }
    });

    return con;
}

module.exports.getRepo = getRepo;
module.exports.RawLogRepository = RawLogRepository;