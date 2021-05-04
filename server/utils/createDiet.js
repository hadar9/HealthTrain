const Diet = require("../models/Diet")
// const FoodItem = require("../models/FoodItem")

const makeNutrition = (foodItems) =>{
    // const foodItemsArr = [
    //     {name : "Egg", amountType : "Unit" , defaultAmount : 1, foodCalories : 180, foodType : "Protein", notes: ["Large egg"]},
    //     {name : "White bread", amountType : "Unit" , defaultAmount : 1, foodCalories : 180, foodType : "Carbs", notes: ["Bread slice"]},
    //     {name : "Farmer cheese", amountType : "Grams" , foodCalories : 180, foodType : "Protein"},
    // ]

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