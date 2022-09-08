const express = require("express");
const { getAllHotels, createHotel, updateHotel, deleteHotel, getHotel } = require("../controllers/hotelController");
const Hotel = require("../models/Hotel");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();




//Create new hotel
router.post("/",verifyAdmin, async (req, res, next)=>{
    createHotel(req, res, next);
});

//update
router.put("/:id",verifyAdmin, updateHotel);

//DELETE
router.delete("/:id",verifyAdmin, deleteHotel);

//GET
router.get("/:id", getHotel);

//GET ALL
router.get("/", getAllHotels); 


module.exports = router;