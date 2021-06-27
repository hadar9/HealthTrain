const Diet = require("../models/Diet")
// const FoodItem = require("../models/FoodItem")

const makeNutrition = (foodItems) =>{

    const foodItemsMapping = foodItems.map(f => ({foodItem : f._id, amount : 1}))
    // console.log(foodItemsMapping)

    mealsArr = [
        {mealName : "Breakfast", foodItems : foodItemsMapping},
        {mealName : "Brunch", foodItems : foodItemsMapping},
        {mealName : "Lunch", foodItems : foodItemsMapping},
        {mealName : "Dinner", foodItems : foodItemsMapping},
    ]

    const nutrition = {
        meals : mealsArr ,
        dietNotes : ["note 1", "note 2"]     
    }

    return nutrition
}

const createDiet = (userID, calories, foodItems) =>{
   const newDiet = new Diet({
        user : userID,
        calories : calories,
        nutrition : makeNutrition(foodItems),
        dietNotes : ["diet note"]
   })

   return newDiet
}

module.exports = createDiet