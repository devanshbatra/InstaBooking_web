const User = require("../models/User");
//controller are to reduce the code on the routes page.

exports.updateuser = async(req, res, next)=>{
    try{
        // const updateduser = await user.findByIdAndUpdate(req.params.id, {$set: req.body});//its gonna return the previous document and not the updated one.    
        const updateduser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});//now, its gonna return the new document.   
        res.status(200).json(updateduser);
    }
    catch(err){
        next(err);
    }
}

exports.deleteuser = async(req, res, next)=>{
    try{
        await User.findByIdAndDelete(req.params.id); //nothing to return in delete.
        res.status(200).json("deleted the user entry");
    }catch(err){
        next(err);
    }
}
exports.getuser = async(req, res, next)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        next(err);
    }
}


exports.getAllusers = async(req, res, next)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        return next(err);
    }
}