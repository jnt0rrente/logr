const mongoose = require("mongoose")

const rawLogSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    sourceId: {
        type: String,
        required: true
    },
    timestamp: {
        type: mongoose.SchemaTypes.Date,
        required: true
    }
})

const RawLog = mongoose.model("RawLog", rawLogSchema)
module.exports = RawLog