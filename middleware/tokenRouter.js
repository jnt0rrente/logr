const express = require('express')
const {config} = require("../config/config")

const tokenRouter = express.Router()

tokenRouter.use(async (req, res, next) => {
    const token = req.get("Authorization")

    if (token != null) {
        let valid = token === config.apikey

        if (valid) {
            return next()
        }
    }

    return res.status(403).json({
        authorized: false,
        message: "Unauthorized key."
    })
})

module.exports = tokenRouter