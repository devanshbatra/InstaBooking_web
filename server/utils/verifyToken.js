//here we are gonna check if the token is present or not, if present then valid or not.
//this will be a middleware file after completing our process we will call next() which will call the 
//next operation.

//this middleware would be used at every route which needs to be protected from unauthorized access.

const jwt = require("jsonwebtoken");
const createError = require("./error");


exports.verifyToken = (req, res, next)=>{
    //token would have come in the cookies with the req
    const token = req.cookies.access_token ;
    //check if token present
    if(!token) return next(createError(400, "Token not found"));

    //verify the token
    jwt.verify(token, process.env.JWT, (err, user)=>{
        if(err) return next(createError(401, "Token not valid"));

        //else we will store the user data previously stored in the token (userid and isAdmin) in the req.anyvariable
        req.tokenuser = user;
        //call the next operation
        next();
    });

}

exports.verifyUser=(req, res, next)=>{
    //first verify token only
    //verifyToken(req, res, callback(to be executed after verify token has been completed));
    this.verifyToken(req, res, ()=>{
        //chk if params mein jo id di hai aur req mein jo lagayi hai verify token ke through
        //kya wo same h ya phir ye admin hai to bhi authorized hai
        if((req.tokenuser.id === req.params.id) || req.tokenuser.isAdmin){
            next();
        }else{
            return next(createError(403, "You are not authorized!"));
        }
    });
}

exports.verifyAdmin=(req, res, next)=>{
    this.verifyToken(req, res, next, ()=>{
        if(req.tokenuser.isAdmin){
            console.log("Yes, the user is admin");
            next();
        }else{
            return next(createError(403, "You don't have permissions as you are not an admin"));
        }
    })
}