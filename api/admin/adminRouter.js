const express = require("express")
const router = express.Router()

const registrationRouter = require("./registration/registrationRouter")
router.use("/register", registrationRouter)

module.exports = router