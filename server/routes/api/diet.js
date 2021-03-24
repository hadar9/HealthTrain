const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Diet = require("../../models/Diet");
const  createDiet  = require("../../utils/createDiet");



// get Diet
router.get("/getDiet/:id", async (req, res) => {
    
    try {  
      console.log("object") 
      const { id } = req.params
     
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
      const nutrition = createDiet(calories)
      console.log(nutrition)
     
      let diet = await Diet.findOne({ user : id });
      console.log(diet)
      if(diet){
          return res.status(200).json(diet)
      }
     
        const newDiet = new Diet({
            user : id,
            nutrition,
            calories,
          });

          await newDiet.save();
     
  
      return res.status(200).json(newDiet)

      } catch (e) {
        console.log(e);
      }
    });
  


module.exports = router;
