const express = require('express');
const { urlencoded, json } =  require('body-parser');
const cors = require('cors');
const {config, loadConfig, buildMongoURL} = require("./config")
const mongoose = require("mongoose")

const app = express();


loadConfig()
console.log("Configuration loaded without errors.")

if (config.output.destination = "database") {
    switch (config.output.databaseType) {
        case "mongodb":
            mongoose
                .connect(
                    buildMongoURL(
                        config.output.database.address,
                        config.output.database.port,
                        config.output.database.database_name),
                    {
                        user: config.output.database.username,
                        pass: config.output.database.password,
                        dbName: config.output.database.database_name,
                        useNewUrlParser: true
                    }
                )
                .then(() => {
                    console.log("Established connection to database " + config.output.database.name)
                })
                .catch(error => {
                    console.error({
                        database_error: error
                    })
                })
            break;
        default:
            break;
    }
}

app.use(cors());
app.use(urlencoded({
    extended: false
}));
app.use(json());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Methods", "POST");//, GET, DELETE, UPDATE, PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
//     next();
// });

const rawLogRoutes = require("./api/rawLog/rawLogRouter")
app.use("/raw", rawLogRoutes)

console.log("Listening on port " + config.port)
app.listen(config.port)

module.exports = app;