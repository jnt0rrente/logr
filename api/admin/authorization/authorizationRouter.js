const {
    body
} = require("express-validator")
const express = require("express")
const authorizationController = require("./authorizationController")
const router = express.Router()

router.post("/checkToken",
    body("token").notEmpty().isJWT().trim().escape(),
    authorizationController.checkToken
)

module.exports = router