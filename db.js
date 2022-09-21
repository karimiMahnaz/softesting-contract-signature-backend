const mongoose = require("mongoose");
require("dotenv").config();

let DB_URL=process.env.DATABASE_URI;
console.log(DB_URL);
///module.exports=  function connection(){

  try{
    mongoose.connect(
      DB_URL,
     {
       useNewUrlParser:true,
       useUnifiedTopology:true,

      })

      mongoose.connection.on("connected", () => {
        console.log("mongoose connected to DB");
      });
      mongoose.connection.on("disconnected", () => {
        console.log("mongoose connection is disconnected");
      });
      process.on("SIGINT", async () => {
        await mongoose.connection.close();
        console.log("disconnected");
        process.exit(0);
      });

      //  .then(()=>console.log("connected successfuly to mongodb server"))
      //  .catch((err)=> console.log(err))
}
  catch(error) {
     console.log('dberror',error);
    
    }
///}