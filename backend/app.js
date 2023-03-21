const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use("/api/user",require("./routes/User-route"));
app.use("/api/blog",require("./routes/Blog-route"));
mongoose.connect(process.env.MONG_URI).then(app.listen(process.env.PORT)).then(()=>{
    console.log("DB connected and app is listening on port 9000")
}).catch((err)=>{
     console.log(err);
})