const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const UserData = require("../../models/UserData");



//register User
router.post("/registerUser", async (req, res) => {
    
    try {    
      const {name, email, password, height, weight, gender, age} = req.body;
      let user = await User.findOne({ email });

      if (user) {
        console.log(user)
        return res.status(400).json({ error : "Email already exists" });
      }
      
      const newUser = new User({
        name,
        email,
        password,
      });
  
      const salt = await bcrypt.genSalt(10);
  
      console.log(newUser);
      newUser.password = await bcrypt.hash(password, salt);
  
      await newUser.save();

    let user1 = await User.findOne({ email });
      console.log(user1)
    if (!user1) {
        return res.status(400).json({ error : "No user" });
    }
    
    const newUserData = new UserData({
        user: user1._id,
        height,
        weight,
        gender, 
        age
    });

    console.log(newUserData)
    await newUserData.save();

    return res.status(200).json("User added successfully");
      } catch (error) {
        console.log(error);
      }
    });
  


module.exports = router;
