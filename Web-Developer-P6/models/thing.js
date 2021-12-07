const Mongoose = require("mongoose");

const thingSchema = Mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true},
});

module.exports = Mongoose.model('thing', thingSchema);