const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const UserData = require("../../models/UserData");

//register new user data
router.post("/getdata", async (req, res) => {
   try{
    const user = req.body.user;
    const userdata = await UserData.findOne({user:user.id}).populate('history');
    console.log(userdata)
      return res.status(200).json(userdata);
    } catch (error) {
      console.log(error);
    }
  });


//register new user data
router.post("/registerUserData", async (req, res) => {
    
    try {    
      const { height, weight, gender, age} = req.body;
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error : "No user" });
      }
      
      const newUserData = new UserData({
        user: user._id,
        height, weight, gender, age
      });
  
     
      await newUserData.save();

      return res.status(200).json("User data added successfully");
    } catch (error) {
      console.log(error);
    }
  });



module.exports = router;
