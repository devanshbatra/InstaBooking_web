const Hotel = require("../models/Hotel");
//controller are to reduce the code on the routes page.


exports.createHotel = async(req, res, next)=>{
    const newHotel = new Hotel(req.body);
    //we will make a try catch to save the data - but we can handle errors using express middlewares
    try{
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }catch(err){
        next(err);
    }
}

exports.updateHotel = async(req, res, next)=>{
    try{
        // const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body});//its gonna return the previous document and not the updated one.    
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});//now, its gonna return the new document.   
        res.status(200).json(updatedHotel);
    }
    catch(err){
        next(err);
    }
}

exports.deleteHotel = async(req, res, next)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id); //nothing to return in delete.
        res.status(200).json("deleted the hotel entry");
    }catch(err){
        next(err);
    }
}
exports.getHotel = async(req, res, next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    }catch(err){
        next(err);
    }
}


exports.getAllHotels = async(req, res, next)=>{
    try{
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    }catch(err){
        return next(err);
    }
}