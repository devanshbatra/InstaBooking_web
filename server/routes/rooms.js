const express = require("express");
const { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms, updateAvailability } = require("../controllers/roomsConroller");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

//create room
router.post("/:hotelid", verifyAdmin, createRoom);


//update room
router.put("/:id", verifyAdmin, updateRoom);
router.put("/updateAvailability/:id", updateAvailability);

//delete room
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//get room by id
router.get("/:id", getRoom);

//get all rooms
router.get("/", getAllRooms);




module.exports = router;