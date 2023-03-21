const mongoose=require("mongoose");
const User=require("../models/User");
const bcrypt=require("bcrypt");
const getAllUser= async(req,res,next)=>{
      let users;
      try {
        users= await User.find();
      } catch (error) {
        console.log(error);
      }
      if(!users){
        return res.status(404).json({message:"No Users Found"});
      }
      return res.status(200).json(users);
}
const signup=async(req,res,next)=>{
     const { name , email , password }=req.body;
     let existingUser;
     try {
        existingUser= await User.findOne({email});
     } catch (error) {
        return  console.log(error);
     }
     if(existingUser){
        return res.status(400).json({message:"User already exist! Login instead"});
     }
     try{
      const salt = bcrypt.genSaltSync(10);
      const hashpassword = bcrypt.hashSync(password, salt);
     const user = await User.create({ name , email , password:hashpassword,blogs:[] });
     return res.status(201).json({user});
    } catch (err){
        return console.log(err);
     }

}
const login = async (req,res,next)=>{
   const { email,password }=req.body;
   let existinguser;
   try {
      existinguser=await User.findOne({email});
   } catch (error) {
      return console.log(error);
   }
   if(!existinguser){
      return res.status(400).json({message:"This user doesn't exist in db"});
   }
   let isPasswordCorrect=bcrypt.compareSync(password,existinguser.password);
   if(!isPasswordCorrect){
      return res.status(400).json({message:"password is incorrect"})
   }
   return res.status(200).json({message:"Login successfull",user:existinguser});
}
module.exports={getAllUser,signup,login};