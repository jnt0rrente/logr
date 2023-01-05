import express from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';

import { Raw, Geolocation } from "./persistence/repositories";

const app = express();
const config = require("./config").load();

app.set("config", config);

const db_connection = require("./persistence/connections").connect(app);

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

app.set("rawLogRepository", new Raw(db_connection));
app.set("geolocationLogRepository", new Geolocation(db_connection))

require("./routes/rawLogs").default(app);
// require("./routes/geolocationLogs")(app)

export default app;