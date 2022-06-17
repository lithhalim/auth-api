const bcrypt = require('bcrypt');
const REGUSTER_MODEL=require("../../model/auth_model/REGUSTER_MODEL")


module.exports=async(req,res,next)=>{
    const{username,password,role}=req.body;
    try{
        let hashPassword=await bcrypt.hash(password,10);//HASH THE PASSWORD
        let user=await REGUSTER_MODEL.findOne({where:{username:username}});//CHECK IF EMAIL TACKEN
        if(user){res.json({username:"Email Is Taken"});}//RESPONSE THE EMAIL ARE TAKEN
            if(!user){//IF EMAIL IS NOT TACKEN 
                let newRecord=await REGUSTER_MODEL.create({
                    username:username,password:hashPassword,role:role
                });
                res.json(newRecord.dataValues)
                res.status(201)
            }
    }
    catch(err){ res.status(403).send('this username is already used , try again')}
}