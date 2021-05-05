const express = require('express');
const router = express.Router();
const WorkOut = require('../../models/WorkOut ');

router.get('/', async (req, res) => {
  try {
    const workouts = await WorkOut.find();
    res.status(200).json(workouts);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/addworkout', async (req, res) => {
  try {
    const newitem = new WorkOut({
      exercises: [],
      totaltime: 0,
    });
    await newitem.save();
    res.status(200).json(newitem);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
