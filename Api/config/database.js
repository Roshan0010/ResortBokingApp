const mongoose = require('mongoose');
require('dotenv').config();



exports.connect=()=>{
   mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
   })
   .then(()=>console.log("Db connextion sucessfull"))
   .catch((err)=>{
    console.log("DB connection issue");
    console.error(err);
    prcoess.exit(1);
   })
   
}