const express = require("express");
const { updateuser, deleteuser, getuser, getAllusers } = require("../controllers/userController");

const router = express.Router();


//update
router.put("/:id", async(req, res, next)=>{
    updateuser(req, res, next);
});

//DELETE
router.delete("/:id", async (req, res, next)=>{
    deleteuser(req, res, next);
});

//GET
router.get("/:id", async (req, res, next)=>{
    getuser(req, res, next)
});

//GET ALL
router.get("/", (req, res, next)=>{
    getAllusers(req, res, next);
}); 

module.exports = router;