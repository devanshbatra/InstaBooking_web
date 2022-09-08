const express = require("express");
const { updateuser, deleteuser, getuser, getAllusers } = require("../controllers/userController");
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

//for testing
// router.get("/checkauthentication", verifyToken, (req, res, next)=>{
//     res.send("Hey, user you have a valid token");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next)=>{
//     res.send("Hey you are a valid user having same token as the id passed");
// });
// router.get("/checkadmin", verifyAdmin, (req, res, next)=>{
//     res.send("Hey you are an admin");
// });




//update
router.put("/:id", verifyUser, async(req, res, next)=>{ //added middleware to verify if the user is owner or admin
    updateuser(req, res, next);
});

//DELETE
router.delete("/:id", verifyUser, deleteuser);

//GET
router.get("/:id", verifyUser, getuser);

//GET ALL
router.get("/", verifyAdmin, getAllusers); 

module.exports = router;