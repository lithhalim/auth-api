const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports=async (req,res,next)=>{
    try {
        res.send("create section")
    }
     catch (error) {
       res.status(403).send('Invalid create ');
    }
      
}