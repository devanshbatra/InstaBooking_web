const express = require("express");
const { login, register } = require("../controllers/authController");

const router = express.Router();

router.post("/register", (req, res, next)=>{ //for this auth file we already have used the /auth so we only need to put / here.
    register(req, res, next);
});
router.post("/login", (req, res, next)=>{ 
    login(req, res, next);
});

module.exports = router;