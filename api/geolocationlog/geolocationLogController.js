const {
    validationResult
} = require("express-validator")

const {config} = require("../../config/config")

async function saveOnMongo({coordinates, id}) {
    const GeolocationLog = require("../../persistence/mongo/GeolocationLog")

    const geolocationLog = new GeolocationLog({
        coordinates,
        id,
        timestamp: new Date()
    })

    geolocationLog.save()
}

async function saveOnFile({coordinates, id}) {
    const fileOutput = require("../../persistence/fileOutput")

    fileOutput.save(
        {
            coordinates,
            id,
            timestamp: new Date().toISOString()
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
                await saveOnFile(req.body)
                break;

            case "database":
                switch (config.output.databaseType) {

                    case "mongodb":
                        await saveOnMongo(req.body)
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