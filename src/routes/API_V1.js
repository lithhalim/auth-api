'use strict';
const express = require('express');
const dataModules = require('../model/index');
const router = express.Router();




//SPECIFIC  THE MODEL DEPEND ON PARAMS
router.param('model', (req, res, next) => {
  console.log(req.params.model)
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});


//GET ALL CONTROLLETS
const handleGetAll=require("../controllers/api_v1_controllers/GET_ALL")
const handleGetOne=require("../controllers/api_v1_controllers/GET_ONE")
const handleCreate=require("../controllers/api_v1_controllers/CREATE")
const handleUpdate=require("../controllers/api_v1_controllers/UPDATE")
const handleDelete=require("../controllers/api_v1_controllers/DELETE")


router.get('/api/v1/:model', handleGetAll);
router.get('/api/v1/:model/:id', handleGetOne);
router.post('/api/v1/:model', handleCreate);
router.put('/api/v1/:model/:id', handleUpdate);
router.delete('/api/v1/:model/:id', handleDelete);




module.exports = router;
