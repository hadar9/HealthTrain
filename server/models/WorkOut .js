const mongoose = require('mongoose');

const WorkOutSchema = new mongoose.Schema({
  exercises: [
    {
      name: {
        type: String,
      },
      gear: {
        type: String,
      },
      difficultylevel: {
        type: String,
      },
      sets: {
        type: String,
      },
      time: {
        type: String,
      },
    },
  ],
  totaltime: {
    type: String,
  },
});
module.exports = WorkOut = mongoose.model('workouts', WorkOutSchema);
