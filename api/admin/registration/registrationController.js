const {
    validationResult
} = require("express-validator")

const {config} = require("../../../config/config")
const jwt = require("jsonwebtoken")

exports.createToken = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try {
        const token = jwt.sign({
            deviceId: req.body.deviceId,
            expirationDate: req.body.expirationDate,
        }, config.auth_secret)

        return res.status(200).json({
            status: "ok",
            token: token
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}