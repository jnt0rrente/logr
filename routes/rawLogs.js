const {
    body
} = require("express-validator")

router.post("/add",
    body("rawContent")().notEmpty().trim(),
    // permissionsRouter([
    //     "estudiosCreate"
    // ]),
    estudioController.addEstudio
)

export default function(app) {
    app.post('/log/raw/write', (req, res) => {
        try {
            let output = app.get("logOutput")
            let log = {
                body: req.body.body,
                timestamp: Date.now()
            };
            output.pass(log);
            console.log("Received raw log: " + JSON.stringify(log));
        } catch (err) {
            res.statusMessage = err;
            res.status("500").end();
            return;
        }
        res.sendStatus("200");
    });
}