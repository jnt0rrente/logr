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
        });
    }

    listAll() {
        let query = "select * from rawLog;";
        this.connection.query(query, function(err, result, fields) {
            if (err) throw err;
            console.log("All Raw logs:");
            console.log(result);
        });
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

class GeolocationLogRepository {
    constructor(connection) {
        this.connection = connection;
    }

    create(log) {
        let query = "insert into geolocationLog (latitude, longitude, accuracy, timestamp) VALUES (?,?,?,?)";
        this.connection.query(query, [log.latitude, log.longitude, log.accuracy, log.timestamp], function(err, result, fields) {
            if (err) throw err;
        });
    }

    listAll() {
        let query = "select * from geolocationLog;";
        this.connection.query(query, function(err, result, fields) {
            if (err) throw err;
            console.log("All Geolocation logs:");
            console.log(result);
        });
        z
    }

    listOne(log) {
        let id = log.id;
        let query = "select * from geolocationLog g where g.id = ?"
        this.connection.query(query, [id], function(err, result, fields) {
            if (err) throw err;
            console.log("Geolocation log " + id + ": ")
            console.log(result);
        });
    }
}

module.exports.Raw = RawLogRepository;
module.exports.Geolocation = GeolocationLogRepository;