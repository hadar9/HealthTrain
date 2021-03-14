const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");


router.get("/getUserByID/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if(!user) return req.status(200).send("No user found")

    res.json(user);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//login User
router.post("/loginUser", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
        rank: user.rank,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_OR_KEY,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



module.exports = router;
