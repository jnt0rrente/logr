module.exports = function(app) {
    app.post('/log/raw/write', (req, res) => {
        try {
            let repository = app.get("rawLogRepository")
            let log = {
                body: req.body.body,
                timestamp: Date.now()
            };
            //repository.create(log);
            console.log("Received raw log: " + JSON.stringify(log));
        } catch (err) {
            res.statusMessage = err;
            res.status("500").end();
            return;
        }
        res.sendStatus("200");
    });
}