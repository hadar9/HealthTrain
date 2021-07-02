const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const env = require("dotenv");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
env.config();

//get all users
router.get("/getAllUsers", auth, async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) return res.status(200).send("No users in DB");

    return res.status(200).json(users);
  } catch (error) {
    console.log("error");
  }
});

//register new trainee
router.post("/registerNewUser", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({ error: "This mail already registered" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    return res.status(200).json("User added successfully");
  } catch (error) {
    console.error(error);
  }
});

//delete user by id
router.delete("/deleteUserByID/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).json("error");
    }
    return res.status(200).json("User deleted successfully");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
