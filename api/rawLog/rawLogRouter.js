const {
    body
} = require("express-validator")
const express = require("express")
const rawLogController = require("./rawLogController")
const router = express.Router()

router.post("/log",
    body("content").notEmpty().trim(),
    // validate some kind of token or sth
    rawLogController.saveLog
)

module.exports = router