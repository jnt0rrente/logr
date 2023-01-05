const fs = require("fs");

let exportedConfig = {

}

function parse() {
    let raw = fs.readFileSync("./config.json");
    let config = JSON.parse(raw);
    return config;
}

function validate(config) {
    if (config.app.store !== "file" && config.app.store !== "database") {
        throw new Error("Invalid config: app.store must be 'file' or 'database'")
    }
}

function load() {
    const config = parse()

    validate(config)

    exportedConfig.port = config.app.port
    exportedConfig.address = config.app.address
    
    if (config.app.store == "file") {
        exportedConfig.output = {
            destination: "file",
            path: config.file.path
        }
    } else if (config.app.store == "database") {
        exportedConfig.output = {
            
        }
        throw new Error("Not yet implemented.")
    }
}

module.exports.load = load;
module.exports.config = exportedConfig