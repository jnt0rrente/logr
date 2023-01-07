fs = require("fs")
const {config} = require("../config")

module.exports.save = function (data) {
    fs.appendFileSync(
        config.output.path,
        JSON.stringify(data) + "\n"
    )
}