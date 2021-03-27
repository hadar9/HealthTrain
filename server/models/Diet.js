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
              name : {type : String},
              amount : {type : Number},
              amountType : {type : String},
              foodCalories : {type : Number},
              notes : [{type : String}],

            }
          ]
        }
      ]
    },
    dietNotes : [ {type : String}]
 
});


module.exports = mongoose.model("diets", DietSchema);
