const express = require("express")
const router = express.Router()

const authorizationRouter = require("./authorization/authorizationRouter")
router.use("/auth", authorizationRouter)

const registrationRouter = require("./registration/registrationRouter")
router.use("/register", registrationRouter)

module.exports = router