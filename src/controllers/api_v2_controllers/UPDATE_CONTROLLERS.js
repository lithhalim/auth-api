

module.exports=async(req,res,next)=>{
    try{
        res.send("Update Api")
    }
    catch(err){ res.status(403).send('Problem In Update')}
}