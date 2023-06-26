const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const createError = require("../utils/error");
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
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});//now, its gonna return the new document with new: true, else by default it would return the old document.   
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


exports.getHotels = async(req, res, next)=>{
    const {min, max, limit, ...others} = req.query; //others denote the direct fields provided.- such as type, featured, rooms etc.
    try{
        // const hotels = await Hotel.find(others).limit(limit); // its simple without min and max constraints and limit means limit the number of results.
        const hotels = await Hotel.find({...others, cheapestPrice: {$gte:min||1, $lte: max||99999}}).limit(limit); //gt: greater than
        res.status(200).json(hotels);   
    }catch(err){
        return next(err);
    }
}

exports.countByCity = async(req, res, next)=>{
    const cities = req.query.cities.split(",");

    try{
        const listOfNumbers = await Promise.all(cities.map(city=>{
            // return Hotel.find({city: city}).length; //we could do this but it will fetch all the properties so its a little bit expensive.
            return Hotel.countDocuments({city: city});
        }));

        res.status(200).json(listOfNumbers);
    }
    catch(err){
        next(createError(500, "cannot fetch numbers by city name"));
    }

}

exports.countByType = async(req, res, next)=>{
    try{
        const hotels = await Hotel.countDocuments({type: "hotel"});
        const villas = await Hotel.countDocuments({type: "villa"});
        const resorts = await Hotel.countDocuments({type: "resort"});
        const cabins = await Hotel.countDocuments({type: "cabin"});
        const cottages = await Hotel.countDocuments({type: "cottage"});

        res.status(200).json([
            {type: "hotel", count: hotels},
            {type: "villa", count: villas},
            {type: "resort", count: resorts},
            {type: "cabin", count: cabins},
            {type: "cottage", count: cottages},
        ]);

    }
    catch(err){
        next(err);
    }
}

exports.getHotelRooms = async (req, res, next)=>{
    try{
        const hotel = await Hotel.findById(req.params.hotelid);
        const list = await Promise.all(hotel.rooms.map(room=>{
            return Room.findById(room);
        }));

        res.status(200).json(list);
    }
    catch(err){
        return next(err);
    }
}