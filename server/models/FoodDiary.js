const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodDiarySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    },
    date: {
        type: Date,
        default: Date.now
    },
    calories: {
      type: Number,
      default: 0
    },
    nutrition: {
      meals : [
        {
          mealName : {type: String},
          foodItems : [
             {
               foodItem : {type: Schema.Types.ObjectId,
                            ref: "foodItems"},
               amount : {type: Number, default : 1}             
              }
          ]
        }
      ],
      dietNotes : [ {type : String}]
    }
 
});


module.exports = mongoose.model("foodDiaries", FoodDiarySchema);
