const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const RawLogRepository = require("./rawLogRepository")
require('dotenv').config();

const app = express();
const port = process.env.API_LISTEN_PORT;

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.set("rawLogRepo", RawLogRepository.getRepo());

app.post('/log/raw/write', (req, res) => {
    try {
        let repository = app.get("rawLogRepo")
        let log = {
            body: req.body.body,
            timestamp: Date.now()
        };
        repository.create(log);
    } catch (err) {
        res.statusMessage = err;
        res.status("500").end();
        return;
    }
    res.sendStatus("200");
});

app.get('/log/raw/print', (req, res) => {
    try {
        let repository = app.get("rawLogRepo")
        repository.listAll();
    } catch (err) {
        res.statusMessage = err;
        res.status("500").end();
        return;
    }
    res.sendStatus("200");
});

app.listen(port, () => console.log(`listening on port ${port}`));