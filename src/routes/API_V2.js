const express = require('express')
const router = express.Router()
const dataModules = require('../model/index');

router.param('model', (req, res, next) => {
    const modelName = req.params.model;
    if (dataModules[modelName]) {
      req.model = dataModules[modelName];
      next();
    } else {
      next('Invalid Model');
    }
  });

//ALL CONTROLLERS FUNCTION ARE USE
const creater=require("../controllers/api_v1_controllers/CREATE")
const getter=require("../controllers/api_v1_controllers/GET_ALL")
const updatter=require("../controllers/api_v1_controllers/UPDATE")
const deletter=require("../controllers/api_v1_controllers/DELETE")
const getone=require("../controllers/api_v1_controllers/GET_ONE")

//ALL THE MIDDEL WARE USED
const capability=require("../middelware/capalility")
const BAREAR_AUTH=require("../auth/BAREAR_AUTH")




//ALL ROUTES ARE USED
router.post("/api/v2/:model",BAREAR_AUTH,capability("create"),creater)
router.get("/api/v2/:model",BAREAR_AUTH,getter)
router.put("/api/v2/:model",BAREAR_AUTH,capability("update"),updatter)
router.delete("/api/v2/:model",BAREAR_AUTH,capability("delete"),deletter)
router.get("/api/v2/:model",BAREAR_AUTH,capability("delete"),getone)


module.exports=router


  
  
  

  