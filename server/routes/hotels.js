const express = require("express");
const { createHotel, updateHotel, deleteHotel, getHotel, countByCity, countByType, getHotels } = require("../controllers/hotelController");
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
router.get("/find/:id", getHotel);
router.get("/countByCity", countByCity);
router.get("/countBytype", countByType);


//GET MORE THAN ONE HOTELS USING QUERY.
router.get("/", getHotels); 


module.exports = router;