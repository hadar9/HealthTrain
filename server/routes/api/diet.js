const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Diet = require("../../models/Diet");
const FoodItem = require("../../models/FoodItem");
const  createDiet  = require("../../utils/createDiet");



// get Diet
router.get("/getDiet/:id", async (req, res) => {
    
    try {  
      const { id } = req.params
      console.log(id) 
     
      let diet = await Diet.findOne({ user : id }).populate("nutrition.meals.foodItems.foodItem");
      console.log(diet)
      if(diet){
          return res.status(200).json(diet)
      }
      else{
        return res.status(200).json({error : "No Diet in DB"})
      }
  
     
      } catch (e) {
        console.log(e);
      }
    });

    
// Create Diet
router.get("/createDiet/:id", async (req, res) => {
    
    try {  
     
      const { id } = req.params
      const calories = 1200

      let foodItems = await FoodItem.find();

      let newDiet = createDiet(id, calories, foodItems)
      // console.log(newDiet)
     
      let diet = await Diet.findOne({ user : id });
      // console.log(diet)
      if(diet){
          return res.status(200).json(diet)
      }


      await newDiet.save();
      // let tmp = newDiet;
      // tmp.nutrition.meals.forEach(m => {
      //   m.foodItems.forEach(f => {
      //     const id1 = f.foodItem
      //     let f1 = FoodItem.findOne({_id : id1}).then(res => res)
      //     f.foodItem = f1
      //   });
      // });
      // newDiet.populate("nutrition.meals.foodItems.foodItem")
      let returnDiet = await Diet.findOne({ user : id }).populate("nutrition.meals.foodItems.foodItem");
      if(returnDiet){
        return res.status(200).json(returnDiet)
      }
      return res.status(200).json(newDiet)

      } catch (e) {
        console.log(e);
      }
    });
  
// Update Diet
router.post("/updateDiet", async (req, res) => {
    
    try {  
     
      const { userID, nutrition } = req.body
      
     
      let diet = await Diet.findOne({ user : userID });
      console.log(diet)
      if(!diet){
          return res.status(200).json({error : "Something went wrong"})
      }

      diet.nutrition = nutrition
     
      await diet.save();
    
      return res.status(200).json("Diet saved successfully!")

      } catch (e) {
        console.log(e);
      }
    });
  


module.exports = router;
