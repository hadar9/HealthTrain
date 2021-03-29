const Diet = require("../models/Diet")

const makeNutrition = () =>{

    const foodItemsArr = [
        {name : "Egg", amount : 2, amountType : "Unit" ,foodCalories : 180, notes: ["Large egg"]},
        {name : "White bread", amount : 2, amountType : "Unit" , foodCalories : 180, notes: ["Bread slice"]},
        {name : "Farmer cheese", amount : 100, amountType : "Grams" , foodCalories : 180},
    ]

    mealsArr = [
        {mealName : "Breakfast", foodItems : foodItemsArr},
        {mealName : "Brunch", foodItems : foodItemsArr},
        {mealName : "Lunch", foodItems : foodItemsArr},
        {mealName : "Dinner", foodItems : foodItemsArr},
    ]

    const nutrition = {
        meals : mealsArr ,
        dietNotes : ["note 1", "note 2"]     
    }

    return nutrition
}

const createDiet = (userID, calories) =>{
   const newDiet = new Diet({
        user : userID,
        calories : calories,
        nutrition : makeNutrition(),
        dietNotes : ["diet note"]
   })

   return newDiet
}

module.exports = createDiet