const fs = require("fs");

let exportedConfig = {

}

function buildMongoURL(address, port, name) {
    let url = (port === "srv") ? "mongodb+srv://" + address + "/" + name : "mongodb://" + address + ":" + port + "/" + name
    console.log("Trying to connect to " + url + "...")
    return url
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
    exportedConfig.apikey = config.app.apikey === "" ? process.env.APP_APIKEY : config.app.apikey
    
    if (config.app.store == "file") {
        exportedConfig.output = {
            destination: "file",
            path: config.file.path
        }
    } else if (config.app.store == "database") {
        exportedConfig.output = {
            destination: "database",
            databaseType: config.database.type
        }
        switch (exportedConfig.output.databaseType) {
            case "mongodb":
                exportedConfig.output.database = {
                    address: config.database.mongodb.address === "" ? process.env.MONGODB_ADDRESS : config.database.mongodb.address,
                    port: config.database.mongodb.port === "" ? process.env.MONGODB_PORT : config.database.mongodb.port,
                    database_name: config.database.mongodb.database_name === "" ? process.env.MONGODB_DB_NAME : config.database.mongodb.database_name,
                    username: config.database.mongodb.username === "" ? process.env.MONGODB_USERNAME : config.database.mongodb.username,
                    password: config.database.mongodb.password === "" ? process.env.MONGODB_PASSWORD : config.database.mongodb.password
                }
                break;
            default:
                throw new Error ("Unsupported database type or wrong configuration.")
        }
    } else {
        throw new Error("Not yet implemented.")
    }
}

module.exports.loadConfig = load;
module.exports.config = exportedConfig
module.exports.buildMongoURL = buildMongoURL