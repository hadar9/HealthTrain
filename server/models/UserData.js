const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserDataSchema = new Schema({
 user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    },
  height: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
    default: 0,
  },
  gender: {
    type: String,
    default: "Male",
  },
  age: {
    type: Number,
    default: 0,
  },
  history:{
    type: Schema.Types.ObjectId,
    ref: "workouts",
    }

  

});


module.exports = mongoose.model("userdata", UserDataSchema);
