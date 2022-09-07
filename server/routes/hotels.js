const express = require("express");
const { getAllHotels, createHotel, updateHotel, deleteHotel, getHotel } = require("../controllers/hotelController");
const Hotel = require("../models/Hotel");

const router = express.Router();




//Create new hotel
router.post("/", async (req, res, next)=>{
    createHotel(req, res, next);
});

//update
router.put("/:id", async(req, res, next)=>{
    updateHotel(req, res, next);
});

//DELETE
router.delete("/:id", async (req, res, next)=>{
    deleteHotel(req, res, next);
});

//GET
router.get("/:id", async (req, res, next)=>{
    getHotel(req, res, next)
});

//GET ALL
router.get("/", (req, res, next)=>{
    getAllHotels(req, res, next);
}); 


module.exports = router;