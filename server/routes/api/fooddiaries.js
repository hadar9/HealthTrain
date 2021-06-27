const express = require("express");
const router = express.Router();
const FoodDiary = require("../../models/FoodDiary");
const FoodItem = require("../../models/FoodItem");
const moment = require('moment');
const  convertFoodItemstToIds = require("../../utils/convertFoodItemsToIds");


// get Diary by id and date
router.get("/getDiary/:id/:date", async (req, res) => {
    
    try {  
      let { id, date } = req.params
      
      date = moment(date)
      date = date.utcOffset(0);
      date.set({
       hour: 0,
       minute: 0,
       second: 0,
       millisecond: 0,
      });
      date.add(1, 'days')
      console.log(id, date) 
      
      const query = {
        user: id,
        date: {$eq:date}
      }
      let diary = await FoodDiary.findOne(query).populate("nutrition.meals.foodItems.foodItem");
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

    
// Create or update Diary
router.post("/createOrUpdateDiary", async (req, res) => {
    
    try {  
     
      let { user, date, calories, nutrition} = req.body
      console.log(req.body)
      date = moment(date)
      date = date.utcOffset(0);
      date.set({
       hour: 0,
       minute: 0,
       second: 0,
       millisecond: 0,
      });
      date.add(1, 'days')
      console.log(user, date)

      const convertedNutrition = convertFoodItemstToIds(nutrition)

      const query = {
        user: user,
        date: {$eq:date}
      }
      let diary = await FoodDiary.findOne(query)

      if(diary){
        if(calories) diary.calories = calories
        // diary.nutrition.dietNotes ? update diary notes as well
        diary.nutrition = convertedNutrition
        await diary.save()
        return res.status(200).send('Saved diary')
      }

      const newDiary = new FoodDiary({
        user,
        date,
        calories,
        nutrition: convertedNutrition
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
