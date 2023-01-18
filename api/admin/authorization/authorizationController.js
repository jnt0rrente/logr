const {
    validationResult
} = require("express-validator")

const {config} = require("../../../config/config")
const jwt = require("jsonwebtoken")

exports.checkToken = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try {
        const token = req.body.token

        jwt.verify(token, config.auth_secret, {}, async (error, tokenData) => {
            if (error || Date.now() / 1000 > tokenData.exp) {
                return res.status(403).json({
                    valid: false,
                    error: error
                })
            } else {
                return res.status(200).json({
                    valid: true,
                    tokenData
                });
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}