const express = require('express');
const { urlencoded, json } =  require('body-parser');
const cors = require('cors');

const app = express();
require("./config").load();

console.log("Configuration loaded without errors.")

app.use(cors());
app.use(urlencoded({
    extended: false
}));
app.use(json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "POST");//, GET, DELETE, UPDATE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
});

const rawLogRoutes = require("./api/rawLog/rawLogRouter")
app.use("/raw", rawLogRoutes)

module.exports = app;