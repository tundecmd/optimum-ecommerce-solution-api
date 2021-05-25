const express = require("express");
const router = express.Router();

const { signup, signin } = require("../controllers/auth");


// router.post("/signup", (req, res) => {
//     console.log(`registered`)
// });


router.post("/signup", signup);
router.post("/signin", signin);


module.exports = router;