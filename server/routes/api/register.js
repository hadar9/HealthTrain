const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");



//register User
router.post("/registerUser", async (req, res) => {
    
    try {    
      const {name, email, password} = req.body;
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

      return res.status(200).json("User added successfully");
    } catch (error) {
      console.log(error);
    }
  });



module.exports = router;
