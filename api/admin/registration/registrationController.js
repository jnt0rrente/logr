const {
    validationResult, body
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
        const expirationDate = new Date(req.body.expirationDate)
        const exp = expirationDate.getTime() / 1000
        const secret = config.auth_secret

        var token = jwt.sign({
            deviceId: req.body.deviceId,
            valid: true
        }, secret, {
            expiresIn: exp
        })

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