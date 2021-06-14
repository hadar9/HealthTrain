const express = require("express");
const router = express.Router();
const FoodDiary = require("../../models/FoodDiary");
const FoodItem = require("../../models/FoodItem");



// get Diary by id and date
router.get("/getDiary/:id/:date", async (req, res) => {
    
    try {  
      const { id, date } = req.params
      console.log(id, date) 
     
      let diary = await FoodDiary.findOne({ user : id, date: date }).populate("nutrition.meals.foodItems.foodItem");
      console.log(diary)
      if(diary){
          return res.status(200).json(diary)
      }
      else{
        return res.status(200).json({error : "No Diary in DB"})
      }
  
     
      } catch (e) {
        console.log(e);
      }
    });

    
// Create Diary
router.post("/createDiary", async (req, res) => {
    
    try {  
     
      const { user, date, calories, nutrition} = req.body

      const newDiary = new FoodDiary({
        user,
        date,
        calories,
        nutrition
      })

      await newDiary.save()
      res.status(200).send('Saved New diary')

      } catch (e) {
        console.log(e);
      }
    });
  
// Update Diary
router.post("/updateDiary", async (req, res) => {
    
    try {  
     
      const { user, nutrition, date } = req.body
      
     
      let diary = await FoodDiary.findOne({ user : user, date: date });
      console.log(diary)
      if(!diary){
          return res.status(200).send("Something went wrong")
      }

      diary.nutrition = nutrition
     
      await diary.save();
    
      return res.status(200).json("Diary updated Successfully!")

      } catch (e) {
        console.log(e);
      }
    });
  


module.exports = router;
