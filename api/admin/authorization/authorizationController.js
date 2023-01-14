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

        jwt.verify(token, process.env.AUTH_SECRET, {}, async (error, tokenData) => {
            if (error) {//|| ((Date.now() / 1000 - tokenData.iat) > 86400)) { //24h token
                return res.status(403).json({
                    authorized: false,
                    error: 'Source token error.'
                })
            } else {
                return res.status(200).json({
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