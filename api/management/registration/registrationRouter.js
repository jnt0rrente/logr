const {
    body
} = require("express-validator")
const express = require("express")
const registrationController = require("./registrationController")
const router = express.Router()

router.post("/new",
    body("deviceId").notEmpty().isAlphanumeric().trim().escape(),
    body("expirationDate").notEmpty().isISO8601().trim().escape(),
    
    registrationController.createToken
)

module.exports = router