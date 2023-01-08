const mongoose = require("mongoose")

const geolocationLog = mongoose.Schema({
    coordinates: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    timestamp: {
        type: mongoose.SchemaTypes.Date,
        required: true
    }
})

const GeolocationLog = mongoose.model("GeolocationLog", geolocationLog)
module.exports = GeolocationLog