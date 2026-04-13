const Admin = require("../models/user");

const admin = async(req , res , next) =>{
  try{
    if(req.user.role !== "admin"){
    return res.status(403).json({message:"acess denied"});
    }else{
     next();
    };
  }catch(error){
    console.log(error);
    res.status(500).json({message:"internal error"});
  };
};

module.exports = admin;
