const express = require('express')
const router = express.Router()



//ALL CONTROLLERS FUNCTION ARE USE
const creater=require("../controllers/api_v2_controllers/CREATE_CONTROLLERS")
const getter=require("../controllers/api_v2_controllers/READ_CONTROLLERS")
const updatter=require("../controllers/api_v2_controllers/UPDATE_CONTROLLERS")
const deletter=require("../controllers/api_v2_controllers/DELETE_CONTROLLERS")

//ALL THE MIDDEL WARE USED
const capability=require("../middelware/capalility")
const BAREAR_AUTH=require("../auth/BAREAR_AUTH")




//ALL ROUTES ARE USED
router.post("/api/v2",BAREAR_AUTH,capability("create"),creater)
router.get("/api/v2",BAREAR_AUTH,getter)
router.put("/api/v2",BAREAR_AUTH,capability("update"),updatter)
router.delete("/api/v2",BAREAR_AUTH,capability("delete"),deletter)


module.exports=router

