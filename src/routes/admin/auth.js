const express = require("express");
const router = express.Router();

const { adminSignup, adminSignin } = require("../../controllers/admin/auth");

router.post("/signup", adminSignup);
router.post("/signin", adminSignin);


module.exports = router;