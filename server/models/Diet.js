const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DietSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    },
    calories: {
      type: Number,
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


module.exports = mongoose.model("diets", DietSchema);
