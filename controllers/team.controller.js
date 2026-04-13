const Team = require("../models/team");
const JoinTeam = require("../models/joinTeam");

exports.createTeam = async(req , res)=>{
  try{
    const {name , description , skills , maxSize} = req.body;
    if(!name || !description || !skills || !maxSize){
      return res.status(400).json({message:"Please fill the input field"});
    };

     const leader = req.user.id;

    const team = new Team({
      name ,
      description,
      skills,
      maxSize,
      leader,
      members: [leader],
    });

    await team.save();
    res.status(201).json({message:"Your team create sucessfully"});

  }catch(error){
    console.log(error.response?.data);
    res.status(500).json({message:"internal error"});
  };
};

exports.joinTeam = async(req , res) =>{
  try{
    const userId = req.user.id;
    const teamId = req.body.teamId;

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    };

    if(team.members.includes(userId)){
       return res.status(400).json({ message: "Already a member" });
    }

    if(team.members.length >= team.maxSize){
      return res.status(400).json({ message: "Team is full" });
    };

    const existingRequest = await JoinTeam.findOne(
      {
        user: userId,
        team : teamId,
        status: "pending",
      }
    );

    if(existingRequest){
      return res.status(400).json({message:"Request already sent"})
    };

    await JoinTeam.create({
      user: userId,
      team: teamId,
    });

    res.status(201).json({ message: "Join request sent" });
  }catch(error){
    res.status(500).json({message:"internal error"})
  };
};

exports.getRequests = async (req, res) => {
  try {
    const leaderId = req.user.id;
    const teams = await Team.find({ leader: leaderId });
    const teamIds = teams.map((team) => team._id);
    const requests = await JoinTeam.find({
      team: { $in: teamIds },
      status: "pending",
    })
      .populate("user", "name")   
      .populate("team", "name");  
    res.status(200).json(requests);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal error" });
  }
};

exports.accept  = async(req , res) =>{
  try{
    const leaderId = req.user.id;
    const requestId = req.body.requestId;
    const request = await JoinTeam.findById(requestId);
    if(!request){
  return res.status(404).json({message:"Request not found"});
}
   const team = await Team.findById(request.team);

    if(team.leader.toString()!== leaderId){
      return res.status(403).json({ message: "Only leader can accept" });
    }

    if(team.members.length >= team.maxSize){
       return res.status(400).json({ message: "Team is full" });
    }

    if(team.members.includes(request.user)){
      return res.status(400).json({ message: "User already in team" });
    }

     team.members.push(request.user);
    await team.save();

       request.status = "accepted";
    await request.save();

    res.status(200).json({ message: "Request accepted successfully" });
    }catch (error) {
    res.status(500).json({ message: "internal error" });
  };
};

exports.reject = async(req , res)=>{
  try{
    const requestId = req.body.requestId;
    const request = await JoinTeam.findById(requestId);
    if(!request){
      return res.status(400).json({message:"request not found"});
    }
   const team = await Team.findById(request.team);

if (team.leader.toString() !== req.user.id) {
  return res.status(403).json({ message: "Only leader can reject" });
}

 await JoinTeam.findByIdAndDelete(requestId);
res.status(200).json({ message: "Request rejected successfully" });


  }catch(error){
    console.log(error);
    res.status(500).json({message:"internal error"});
  }
}

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate("leader", "name") 
      .populate("members", "name");

    res.status(200).json(teams);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal error" });
  }
};

exports.getTeamByID = async(req , res) =>{
  try{
    const teamId = req.params.teamId;
    const team = await Team.findById(teamId)
    .populate("leader" , "name")
    .populate("members" , "name");

    if(!team){
      return res.status(404).json({message:"Team not found"});
    };

   res.status(200).json(team);

  }catch(error){
    console.log(error);
    res.status(500).json({message:"internal error"});
  };
};