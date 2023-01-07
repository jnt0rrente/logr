const {
    validationResult
} = require("express-validator")

const {config} = require("../../config")

async function saveOnMongo(content) {
    const RawLog = require("../../persistence/mongo/RawLog")

    const rawLog = new RawLog({
        content: content,
        timestamp: new Date()
    })

    const saved = await rawLog.save()
}

async function saveOnFile(content) {
    const fileOutput = require("../../persistence/fileOutput")

    fileOutput.save(
        {
            "content": req.body.content,
            "timestamp": new Date().toISOString()
        }
    )
}

exports.saveLog = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try {
        switch (config.output.destination) {

            case "file":
                await saveOnFile(req.body.content)
                break;

            case "database":
                switch (config.output.databaseType) {

                    case "mongodb":
                        await saveOnMongo(req.body.content)
                        break;

                    default:
                        break;
                }
                break;
            default:
                break;
        }

        return res.status(200).json({"status": "ok"})
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}