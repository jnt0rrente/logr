const fs = require("fs");

let exportedConfig = {

}

function parseDefaults() {
    let raw = fs.readFileSync("./config/defaults.json");
    let defaults = JSON.parse(raw);
    return defaults;
}

function validateEnv(env) {
    validOutputs = ["file", "database"]
    validDatabases = ["mongodb"]

    if (env.apikey === "") {
        throw new Error ("Unsupported database type or wrong configuration.")
    }
    
    if (!validOutputs.includes(env.output)) {
        throw new Error ("Invalid output option. Accepted: " + JSON.stringify(validOutputs) + ", got '" + env.output + "'.")
    }

    if (env.output === "database") {
        switch (env.database_type) {
            case "mongodb":
                if (env.mongodb_connection_string === undefined || !/mongodb(?:\+srv)?:\/\/.*/.test(env.mongodb_connection_string)) {
                    throw new Error ("Invalid MongoDB connection string: '" + env.mongodb_connection_string + "'")
                }

                break;
            default:
                throw new Error ("Invalid database type. Accepted: " + JSON.stringify(validDatabases) + ", got '" + env.database_type + "'.")
        }
    }
}

function loadEnv() {
    const env = {
        apikey: process.env.APP_APIKEY,
        output: process.env.OUTPUT,
        database_type: process.env.DATABASE_TYPE,
        mongodb_connection_string: process.env.MONGODB_CONNECTION_STRING
    }

    validateEnv(env)

    return env
}

function load() {
    const defaults = parseDefaults()
    const envVars = loadEnv()

    exportedConfig.port = defaults.app.port
    exportedConfig.address = defaults.app.address
    exportedConfig.apikey = envVars.apikey ?? defaults.apikey
    
    const output = envVars.output

    if (output === "file") {
        exportedConfig.output = {
            destination: "file",
            path: defaults.file.path
        }
    } else if (output === "database") {
        exportedConfig.output = {
            destination: "database",
            databaseType: envVars.database_type
        }
        switch (exportedConfig.output.databaseType) {
            case "mongodb":
                exportedConfig.output.database = {
                    connection_string: envVars.mongodb_connection_string
                }
                break;
            default:
                throw new Error("Unsupported database type or wrong configuration.")
        }
    } else {
        throw new Error("Not yet implemented.")
    }
}

const config = exportedConfig

module.exports.loadConfig = load;
module.exports.config = config