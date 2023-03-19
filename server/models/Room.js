const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxPeople:{
        type: Number,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    roomNumbers: [{number: Number, unavailableDates: {type: [Date]}}] //created this model for multiple room numbers suppose you have a hotel with first floor having 20 rooms and each of them have same titile, price, maxPeople and desc and the only difference is that they have different room number so we created an array with the information of the rooms numbers which possess all these properties.
}, {timestamps: true});//with timestamps it is gonna update it and create it noting the times.

module.exports = mongoose.model("Room", RoomSchema);