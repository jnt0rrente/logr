const express = require('express');
const http = require('http');
const { urlencoded, json } =  require('body-parser');
const cors = require('cors');
require('dotenv').config();

const {config, loadConfig} = require("./config/config")

const mongoose = require("mongoose")
mongoose.set('strictQuery', false);

const app = express();

loadConfig()
console.log("Configuration loaded without errors.")

if (config.output.destination === "database") {
    switch (config.output.databaseType) {
        case "mongodb":
            mongoose
                .connect(config.output.database.connection_string)
                .then(() => {
                    console.log("Established connection to database.")
                })
                .catch(error => {
                    console.error({
                        mongodb_error: error
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

const apikeyRouter = require("./middleware/apikeyRouter")
const sourceTokenRouter = require("./middleware/sourceTokenRouter")

const adminRoutes = require("./api/admin/adminRouter")
app.use("/admin", apikeyRouter, adminRoutes)

const rawLogRoutes = require("./api/rawLog/rawLogRouter")
app.use("/raw", sourceTokenRouter, rawLogRoutes)

const geolocationLogRoutes = require("./api/geolocationlog/geolocationLogRouter")
app.use("/geolocation", sourceTokenRouter, geolocationLogRoutes)

let server = http.createServer(app);

server.listen(config.port, function() {
    console.log("Logr listening on port " + config.port);
})

module.exports = app;