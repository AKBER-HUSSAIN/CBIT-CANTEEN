const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    imageUrl: String,
});

module.exports = mongoose.model("Food", FoodSchema);
