const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DietSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    },
  nutrition: {
    type: String,
  },
  calories: {
    type: Number,
  },
 
});


module.exports = mongoose.model("diets", DietSchema);
