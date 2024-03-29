const {
    validationResult
} = require("express-validator")

const {config} = require("../../config/config")

async function saveOnMongo({content}, sourceId, date) {
    try {
        const RawLog = require("../../persistence/mongo/RawLog")

        const rawLog = new RawLog({
            content,
            sourceId,
            timestamp: date
        })

        rawLog.save()
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

async function saveOnFile({content}, sourceId, date) {
    try {
        const fileOutput = require("../../persistence/fileOutput")

        fileOutput.save(
            {
                sourceId,
                content,
                timestamp: date.toISOString()
            }
        )
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.saveLog = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    let date = new Date()
    console.log(date.toISOString() + "\tRaw Log\t[Source: " + req.sourceData.id + "\tContent: " + req.body.content + "]")

    try {
        switch (config.output.destination) {
            case "file":
                await saveOnFile(req.body, req.sourceData.id, date)
                break;

            case "database":
                switch (config.output.databaseType) {

                    case "mongodb":
                        await saveOnMongo(req.body, req.sourceData.id, date)
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