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
            console.log("All Raw logs:");
            console.log(result);
        });
        z
    }

    listOne(log) {
        let id = log.id;
        let query = "select * from rawLog r where r.id = ?"
        this.connection.query(query, [id], function(err, result, fields) {
            if (err) throw err;
            console.log("Raw log " + id + ": ")
            console.log(result);
        });
    }
}

module.exports.Raw = RawLogRepository;