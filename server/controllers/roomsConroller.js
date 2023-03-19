const Room = require("../models/Room");
const Hotel = require("../models/Hotel");
const { findByIdAndUpdate } = require("../models/Room");

exports.createRoom = async(req, res, next)=>{

    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try{
        const savedRoom = await newRoom.save();
        try{
            await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: savedRoom._id}})
        }catch(err){
            return next(err);
        }
        res.status(200).json(savedRoom);
    }catch(err){
        return next(err);
    }

}

//update 
exports.updateRoom = async(req, res, next) => {
    const roomid = req.params.id;
    try{
        const updatedroom = await Room.findByIdAndUpdate(roomid, {$set: req.body}, {new: true});
        res.status(200).send(updatedroom);
    }catch(err){
        return next(err);
    }
}

//delete
exports.deleteRoom = async(req, res, next)=>{
    const roomid = req.params.id;
    const hotelid = req.params.hotelid;
    try{
        await Room.findByIdAndDelete(roomid);
        //also need to delete from the hotel rooms array
        try{
            await Hotel.findByIdAndUpdate(hotelid, {$pull: {rooms: roomid}})
        }catch(err){
            return next(err);
        }

        res.status(200).send("Deleted the room entry!");
    }catch(err){
        return next(err);
    }
}

//get room by id
exports.getRoom = async(req, res, next)=>{
    try{
        const roominfo = await Room.findById(req.params.id);
        res.status(200).json(roominfo);
    }
    catch(err){
        return next(err);
    }
}

//get all rooms
exports.getAllRooms = async(req, res, next)=>{
    try{
        const rooms = await Room.find();
        res.status(200).json(rooms);
    }catch(err){
        return next(err);
    }
}