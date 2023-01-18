const express = require('express')
const {config} = require("../config/config")
const jwt = require("jsonwebtoken")

const tokenRouter = express.Router()

tokenRouter.use(async (req, res, next) => {
    const token = req.get('Authorization')
    if (token != null) {
        jwt.verify(token, config.auth_secret, {}, async (error, tokenData) => {
            if (error || Date.now() / 1000 > tokenData.exp) {
                return res.status(403).json({
                    valid: false,
                    error: error
                })
            } else {
                req.sourceData = {
                    id: tokenData.deviceId
                }

                return next();
            }
        })
    } else {
        res.status(403).json({
            authorized: false,
            error: 'Null token.'
        })
    }
})

module.exports = tokenRouter