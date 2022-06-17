'use strict';

module.exports=async(req,res,next)=>{
    try {
      res.send("Delete Api")
      } catch (e) {
        console.error(e);
        next(e);
      }
}

