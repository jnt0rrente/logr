fs = require("fs")
config = require("../config").config

module.exports.save = function (data) {

    console.log(config.output.path)
    
    fs.writeFile(
        config.output.path,
        data
    )
}