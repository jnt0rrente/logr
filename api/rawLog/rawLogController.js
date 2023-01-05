const {
    validationResult
} = require("express-validator")

exports.saveLog = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try {
        const fileOutput = require("../../persistence/fileOutput")

        fileOutput.save(req.body.rawContent)
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}