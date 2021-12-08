const Mongoose = require("mongoose");

const saucesSchema = Mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    
});

module.exports = Mongoose.model('Sauces', saucesSchema);