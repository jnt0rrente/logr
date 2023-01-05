export default function(app) {
    app.post('/log/geolocation/write', (req, res) => {
        try {
            let output = app.get("logOutput")
            let log = {
                body: req.body.body,

                timestamp: Date.now()
            };
            output.pass(log);
            console.log("Received geolocation log: " + JSON.stringify(log));
        } catch (err) {
            res.statusMessage = err;
            res.status("500").end();
            return;
        }
        res.sendStatus("200");
    });

}