const {
    validationResult
} = require("express-validator")

const {config} = require("../../config/config")

async function saveOnMongo({coordinates, sourceId}, date) {
    const GeolocationLog = require("../../persistence/mongo/GeolocationLog")

    const geolocationLog = new GeolocationLog({
        coordinates,
        sourceId,
        timestamp: date
    })

    geolocationLog.save()
}

async function saveOnFile({coordinates, sourceId}, date) {
    const fileOutput = require("../../persistence/fileOutput")

    fileOutput.save(
        {
            coordinates,
            sourceId,
            timestamp: date.toISOString()
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

    let date = new Date()
    console.log(date.toISOString() + "\tGeolocation Log\t[Source: " + req.body.sourceId + "\tCoordinates: " + req.body.coordinates + "]")

    try {
        switch (config.output.destination) {
            case "file":
                await saveOnFile(req.body, date)
                break;

            case "database":
                switch (config.output.databaseType) {

                    case "mongodb":
                        await saveOnMongo(req.body, date)
                        break;

                    default:
                        throw new Error("Unsupported database type.")
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