fs = require("fs")

module.exports = function getFileSaveFunction(path) {
    return (data) => {
        fs.writeFile(
            path,
            data
        )
    }
}