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
        
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}