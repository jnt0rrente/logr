const express = require('express')
const {config} = require("../config/config")

const tokenRouter = express.Router()

tokenRouter.use(async (req, res, next) => {
    
    //TODO
    return next()
})

module.exports = tokenRouter