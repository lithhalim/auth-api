require('dotenv').config();
const jwt = require('jsonwebtoken');
const REGUSTER_MODEL=require("../model/auth_model/REGUSTER_MODEL")
const createError = require('http-errors')


module.exports = async (req, res, next) => {
  try {
    if(!req.headers.authorization){
      return res.send("You are not authorized  please set the barear ")
    }
    //CHECK IF THE HEADER CONTAIN AUTHRIZATION 
    if (req.headers.authorization) {
    //GET THE JWT TOKEN FROM HERE( Bearer eyJhbGciXVCJ9.eyJlbWFpbCI6ImxpY1NTI3NTk4MH0.0) CODE WILL ACCEPT ASS STRING
    var token = req.headers.authorization.split(' ')[1];
    //GET THE SIGNIN ELEMT {USERNAME,SECRETE,EXPIRATION}{ email: 'lith', iat: 1655275080, exp: 1655275980 }
    const parsedToken = jwt.verify(token, process.env.SECRET_ACCES_KEY)
    //SEARCH  IN DATABASE AND RETURN THE USER HAVE THE SAME EMAIL
    const user =await REGUSTER_MODEL.findOne({where:{username:parsedToken.username}})
    req.user=user
    next()

    }
  } catch (e) {
    res.status(403);
    res.send("Invalid Signin");

  }
}

