const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    photos: {
        // to show the array of strings.
        type: [String]
    },
    desc: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        min: 0,
        max: 5
    },
    rooms: {
        type: [String], //we will have an array of rooms containing the room id.
    },
    cheapestPrice: {
        type: Number, //we will have an array of rooms containing the room id.
        required: true
    },
    featured: {
        type: Boolean, //we will have an array of rooms containing the room id.
        default: false
    },
    
});

//we have to export this by using mongoose.model and this hotel model will act as a hotel database everywhere in the backend
module.exports = mongoose.model("Hotel", hotelSchema);