const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TraineeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    default: 2,
  },
  active : {
    type: Number,
    default: 1

  }

 
});


module.exports = mongoose.model("trainees", TraineeSchema);
