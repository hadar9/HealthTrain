const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Diet = require("../../models/Diet");
const  createDiet  = require("../../utils/createDiet");



// get Diet
router.get("/getDiet/:id", async (req, res) => {
    
    try {  
      const { id } = req.params
      console.log(id) 
     
      let diet = await Diet.findOne({ user : id });
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
      const newDiet = createDiet(id, calories)
      console.log(newDiet)
     
      let diet = await Diet.findOne({ user : id });
      console.log(diet)
      if(diet){
          return res.status(200).json(diet)
      }
     
      // const newDiet = new Diet({
      //     user : id,
      //     nutrition,
      //     calories,
      //   });

      await newDiet.save();
    
  
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
