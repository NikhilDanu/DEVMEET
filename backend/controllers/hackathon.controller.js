const Hackathon = require("../models/hackathon");

exports.createHackathon = async (req, res) => {
  try {
    const {
      name,
      description,
      location,
      startDate,
      endDate,
      registrationDeadline,
      url,
      image,
      mode
    } = req.body;

    if (!name || !location || !startDate || !endDate) {
      return res.status(400).json({
        message: "Please fill required fields",
      });
    }

    const hackathon = new Hackathon({
      name,
      description,
      location,
      startDate,
      endDate,
      registrationDeadline,
      url,
      image,
      mode,
      createdBy: req.user?.id, 
    });

    await hackathon.save();

    res.status(201).json({
      message: "Hackathon created successfully",
      hackathon,
    });

  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Hackathon already exists",
      });
    }

    res.status(500).json({ message: "Server Error" });
  }
};

exports.getHackathons = async(req ,res)=>{
  try{
    const hackathons = await Hackathon.find().sort({startDate: 1});
     res.status(200).json(hackathons);
  }catch(error){
    console.log(error);
    res.status(500).json({message:"internal error"});
  };
};
