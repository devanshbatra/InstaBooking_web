const User = require("../models/User");
const bcrypt = require('bcryptjs');
const createError = require("../utils/error");
const jwt = require("jsonwebtoken");

exports.register = async(req, res, next)=>{
    const {username, email, password} = req.body;


    //check if username or email exist before
    const prevUser = await User.findOne({username: username});
    if(prevUser) return next(createError(400, "Username already exists"));
    
    const prevUser2 = await User.findOne({email});
    if(prevUser2) return next(createError(400, "email already exists"));

    //new user
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    console.log("hashed password: ", hashedPassword);
    try{
        const newUser = new User({username, email, password: hashedPassword});
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);

    }catch(err){
        next(err);
    }

}
exports.login = async(req, res, next)=>{
    const {username, password}  = req.body;

    
    try{
        const user = await User.findOne({username: username});
        if(!user) return next(createError(404, "User not found!"));
        
        const isPassValid = await bcrypt.compare(password, user.password);
        if(!isPassValid) return next(createError(400, "Incorrect username or password"));
        
        //the user founds to be valid
        console.log("logged in as: ", username, password);

        //for user session - make a jwt token and store that into the cookies using cookie parser
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT);

        //for sending cookie res.cookie(cookiename, cookievalue, {options for cookies}).json(otherthings)


        res
            .cookie("access_token", token, {httpOnly: true}) //httponly so that client script cannot modify our token.
            .status(200)
            .json(user);

    }catch(err){
        res.json(err);
    }
    

}