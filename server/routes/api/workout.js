const express = require('express');
const router = express.Router();
const WorkOut = require('../../models/WorkOut ');
const UserData = require('../../models/UserData');

router.get('/', async (req, res) => {
  try {
    const workouts = await WorkOut.find();
    res.status(200).json(workouts);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/addexercise', async (req, res) => {
  try {
    const { workoutid } = req.body;
    const exercise = {
      name: 'hadar1243542',
      gear: 'ball134324',
      difficultylevel: 'hard',
      sets: 32,
      calorieperset:30,
      totalexcolories:calorieperset*sets,
      time: '4 min',
    };
    const newitem = await WorkOut.findOneAndUpdate(
      { _id: workoutid },
      { $push: { exercises: exercise },
      $set:{
        totalcalories:totalcalories+exercise.totalexcolories
      } }
    );

    newitem.save();
    res.status(500).send('exercise added');
  } catch (e) {
    res.status(500).send('Server Error');
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
  }
});
router.post('/chooseworkout', async (req, res) => {
  try {
    const  {work,user}  = req.body;
   
    const newitem = await UserData.findOneAndUpdate(
      { user: user.id },
      { $set: { history: work._id } }
    );
    await newitem.save();
    res.status(200).send('choose workout succses!');
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
