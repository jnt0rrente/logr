fs = require("fs")
const {config} = require("../config/config")

module.exports.save = function (data) {
    console.log("Writing to " + config.output.path)
    fs.appendFileSync(
        config.output.path,
        JSON.stringify(data) + "\n"
    )
}