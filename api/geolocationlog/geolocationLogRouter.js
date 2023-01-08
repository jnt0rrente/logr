const {
    body
} = require("express-validator")
const express = require("express")
const rawLogController = require("./geolocationLogController")
const router = express.Router()

router.post("/log",
    body("coordinates").notEmpty().isLatLong().trim().escape(),
    body("id").notEmpty().trim().escape(),
    body("content").notEmpty().trim().escape(),
    rawLogController.saveLog
)

module.exports = router