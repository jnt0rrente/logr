const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let logs = [];

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.post('/log', (req, res) => {
    const log = req.body;
    console.log(log);
    logs.push(log);

    res.sendStatus("200");
});

app.get('/print', (req, res) => {
    console.log(logs);
    res.sendStatus("200");
});

app.listen(port, () => console.log(`listening on port ${port}`));