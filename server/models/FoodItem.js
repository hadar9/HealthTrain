const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodItemsSchema = new Schema({
  
  name : {
    type : String,
    required: true
  },
  amountType : {
    type : String,
    required: true
  },
  defaultAmount : {
    type : Number,
    default: 1
  },
  foodCalories : {
    type : Number,
    required: true
  },
  foodType : {type : String, required : true},
  notes : [{type : String}],

 
});


module.exports = mongoose.model("foodItems", FoodItemsSchema);
