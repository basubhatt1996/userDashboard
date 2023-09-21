const mongoose = require("mongoose");

const DB = process.env.DATABASE || "mongodb://localhost:27017/userData"


mongoose.connect(DB).then(()=> console.log("DataBase Connected")).catch((err)=>{
    console.log(err);
})