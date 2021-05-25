const express = require("express");
const router = express.Router();

const {signup} = require("../controllers/auth");


// router.post("/signup", (req, res) => {
//     console.log(`registered`)
// });



router.post("/signup", signup)


module.exports = router;