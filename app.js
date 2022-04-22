const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const Repositories = require("./persistence/repositories");

const app = express();
const config = require("./config").load();
app.set("config", config);

const db_connection = require("./persistence/connections").connect(app);

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, UPDATE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
});

app.set("rawLogRepository", new Repositories.Raw(db_connection));
app.set("geolocationLogRepository", new Repositories.Geolocation(db_connection))

require("./routes/rawLogs")(app);
require("./routes/geolocationLogs")(app)

module.exports = app;