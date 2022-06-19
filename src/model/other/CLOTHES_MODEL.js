'use strict';

const {DataTypes}=require("sequelize")
const LITH_DATABASE=require("../../database/LITH_DATABASE")
const COLLECTION= require("../../model/other/CLASS_COLLECTION")

const foodMoled= LITH_DATABASE.define("clothes",{
    name: { type: DataTypes.STRING, required: true },
    color: { type: DataTypes.STRING, required: true },
    size: { type: DataTypes.STRING, required: true }
  
})
module.exports=new COLLECTION(foodMoled)
