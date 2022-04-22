module.exports = function(app) {
    app.post('/log/geolocation/write', (req, res) => {
        try {
            let repository = app.get("geolocationLogRepository")
            let log = {
                body: req.body.body,

                timestamp: Date.now()
            };
            repository.create(log);
            console.log("Received geolocation log: " + JSON.stringify(log));
        } catch (err) {
            res.statusMessage = err;
            res.status("500").end();
            return;
        }
        res.sendStatus("200");
    });

}