const {
    body
} = require("express-validator")
const express = require("express")
const rawLogController = require("./rawLogController")
const router = express.Router()

router.post("/log",
    body("content").notEmpty().trim().escape(),
    body("sourceId").notEmpty().trim().escape(),
    rawLogController.saveLog
)

module.exports = router