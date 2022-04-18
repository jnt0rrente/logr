module.exports = function(app) {
    app.post('/log/raw/write', (req, res) => {
        try {
            let repository = app.get("rawLogRepository")
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
            let repository = app.get("rawLogRepository")
            repository.listAll();
        } catch (err) {
            res.statusMessage = err;
            res.status("500").end();
            return;
        }
        res.sendStatus("200");
    });
}