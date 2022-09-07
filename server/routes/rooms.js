const express = require("express");

const router = express.Router();

router.get("/", (req, res)=>{ //for this auth file we already have used the /auth so we only need to put / here.

    res.send("rooms endpoint");

});

module.exports = router;