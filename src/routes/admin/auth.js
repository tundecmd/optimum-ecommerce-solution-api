const express = require("express");
const router = express.Router();

const { adminSignup, adminSignin, adminSignout } = require("../../controllers/admin/auth");
const { 
    validateSignupRequest, 
    validateSigninRequest, 
    isRequestValidated 
} = require("../../validators/auth");

router.post("/signup", validateSignupRequest, isRequestValidated, adminSignup);
router.post("/signin", validateSigninRequest, isRequestValidated,adminSignin);
router.post("/signout", adminSignout);

module.exports = router;