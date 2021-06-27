const express = require("express");
const router = express.Router();
const FoodItem = require("../../models/FoodItem");




// get Item
router.get("/getFoodItem/:id", async (req, res) => {
    
    try {  
      const { id } = req.params
      console.log(id) 
     
      let foodItem = await FoodItem.findOne({ _id : id });
      console.log(foodItem)
      if(diet){
          return res.status(200).json(foodItem)
      }
      else{
        return res.status(200).json({error : "No food Item with this name in DB"})
      }
  
     
      } catch (e) {
        console.log(e);
      }
    });


// get all food Items
router.get("/getAllFoodItems", async (req, res) => {
    
    try {  
     
     
      let foodItems = await FoodItem.find();
    
      if(foodItems.length === 0){
          return res.status(200).json({error : "No items in DB"})
      }
      else{
        console.log(foodItems)
        return res.status(200).json(foodItems)
      }
     
      } catch (e) {
        console.log(e);
      }
    });

    
// Create foodItem
router.post("/createFoodItem", async (req, res) => {
    
    try {  
     
      const { name, amountType, defaultAmount, foodCalories, foodType } = req.body

      let {notes} = req.body 
      if(!notes) notes = [] 

       const newFoodItem = new FoodItem({
        name, amountType, defaultAmount, foodCalories, foodType, notes
        });
        console.log(newFoodItem)
  
      let foodItem = await FoodItem.findOne({ 
                                              name: name, 
                                              amountType: amountType, 
                                              defaultAmount: defaultAmount, 
                                              foodCalories: foodCalories 
                                            });

      console.log(foodItem)
      if(foodItem){
          return res.status(200).json({error: "This item already exists"})
      }

      await newFoodItem.save();
    
  
      return res.status(200).json(newFoodItem)

      } catch (e) {
        console.log(e);
      }
    });
  
// Update FoodItem
router.post("/updateFoodItemById", async (req, res) => {
    
    try {  
     
      const { id, updatedFood } = req.body
      
      const tmp = new FoodItem(updatedFood)
      let foodItem = await FoodItem.findOne({_id : id  });
      console.log(foodItem)
      if(!foodItem){
          return res.status(200).json({error : "Something went wrong"})
      }

      foodItem = tmp
     
      await foodItem.save();
    
      return res.status(200).json("food Item updated successfully!")

      } catch (e) {
        console.log(e);
      }
    });
  


module.exports = router;
