const mongoose = require('mongoose');

const WorkOutSchema = new mongoose.Schema({
  name: {
    type: String,
  },
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
        type: Number,
      },
      time: {
        type: Number,
      },
    },
  ],
  totaltime: {
    type: Number,
  },
  totalcalories: {
    type: Number,
  },
});
module.exports = WorkOut = mongoose.model('workouts', WorkOutSchema);
