const Profile = require("../models/profile");

exports.createProfile = async(req , res) =>{
  try{
    const {name , bio , skills , role} = req.body;
    if(!name || !bio || !skills || !role){
      return res.status(400).json({message:"Please fill required field"});
    };
    const userId = req.user.id;
    const existingProfile = await Profile.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const profile = new Profile({
      user: userId,
      name,
      bio,
      skills,
      role,
    });
    await profile.save();
    res.status(201).json(profile);
  }catch(error){
     console.log("CREATE PROFILE ERROR:", error); 
    res.status(500).json({message:"internal error"});
  };
};

exports.getProfile = async(req , res)=>{
  try{
    const userId = req.user.id;
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ message: "No profile" });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

