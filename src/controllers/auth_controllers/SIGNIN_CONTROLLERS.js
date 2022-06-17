const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports=async (req,res,next)=>{
    try {
        //USER HAVE CHECK ON COME FROM BASIC AUTH 
        user=req.usered
        //ADD NEW TOKEN FOR THE SPECIFIC USER COME FROM FRONT END 
        var newToken = jwt.sign({ username:user.username }, process.env.SECRET_ACCES_KEY ,{expiresIn:"15m"});//({ email:user.email }TO SELECT THE USER YOU WONT TO ASSIGN TOKEN TO HIM)
        user.token=newToken;//ADD TOKEN TO THE REGUSTER_MODEL OBJECT TO CAN USE FOR VERIFY
        res.status(200).json(user);
    }
     catch (error) {
       res.status(403).send('Invalid Signin');
       }
      
}