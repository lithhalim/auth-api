const express = require('express')
const router = express.Router()



//ALL MEDILWARE FUNCTION ARE USE
const reguster=require("../controllers/auth_controllers/SIGNUP_CONTROLLERS")
const signin=require("../controllers/auth_controllers/SIGNIN_CONTROLLERS")
const signout=require("../controllers/auth_controllers/SIGNOUT_CONTRLLERS")
const allreguster=require("../controllers/auth_controllers/GET_ALL_USER_CONTROLLERS")


//BASIQ AUTH REQUIRE
const BASIC_AUTH=require("../auth/BASIC_AUTH")
const BAREAR_AUTH=require("../auth/BAREAR_AUTH")

//ALL ROUTES ARE USED
router.post("/signup",reguster)
router.post("/signin",BASIC_AUTH,signin)
router.post("/signout",signout)
router.get("/users",BAREAR_AUTH,allreguster)


module.exports=router

