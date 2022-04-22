const fs = require("fs");

function load() {
    let raw = fs.readFileSync("./config.json");
    let config = JSON.parse(raw);
    return config;
}

module.exports.load = load;