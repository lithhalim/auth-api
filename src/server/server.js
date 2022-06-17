const express = require('express')
const app = express()


// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())




//----------------------------------------------ROUTES SECTION------------------------------------------//
const AUTH_ROUTER=require("../routes/AUTH_JWT")
const MAINPAGE=require('../controllers/mainpage/MAINPAGE')
const APIV2=require("../routes/API_V2")
app.use("/",AUTH_ROUTER)
app.get('/',MAINPAGE)
app.use("/",APIV2)

//PROTECTED ROUTES 
const BAREAR_AUTH=require("../auth/BAREAR_AUTH")
app.get("/secret",BAREAR_AUTH,(req,res)=>{
  res.status(200).json({
    'message': 'You are authorized to view the user orders',
    'user': req.user})

})



//--------------------------------------------ERROR HANDELER--------------------------------------------//
const NotFound=require("../middelware/404")
const SomthingBroken=require("../middelware/500")
app.use(SomthingBroken)
app.use(NotFound)




const LITH_DATABASE=require("../database/LITH_DATABASE")
async function start(PORT){// WHE MUST RUN DATABASE CONNECTION BEFORE LISTEN TO SERVER
app.listen(PORT, async() => {
    try {
        await LITH_DATABASE.authenticate();
        await LITH_DATABASE.sync();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }      
  console.log(`Example app listening on port ${PORT}`)
})
}


module.exports ={
    app: app,
    start: start,
}
