'use strict';
const {DataTypes}=require("sequelize")
const LITH_DATABASE=require("../../database/LITH_DATABASE")
const COLLECTION= require("../../model/other/CLASS_COLLECTION")

const clothesMoled= LITH_DATABASE.define("food",{
    name: { type: DataTypes.STRING, required: true },
    calories: { type: DataTypes.STRING, required: true },
    type: { type: DataTypes.ENUM('fruit', 'vegetable', 'protein'), required: true }
  
})

module.exports=new COLLECTION(clothesMoled)


