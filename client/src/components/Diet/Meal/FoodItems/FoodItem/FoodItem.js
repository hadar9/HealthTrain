import React from 'react'
import {  Grid, IconButton } from '@material-ui/core'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import { MealModal } from '../../MealsModal/MealModal';
import { FoodContent } from '../FoodContent';

export const FoodItem = ({food, updateMode, mealIndex, foodIndex}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [foodIndexArr, setFoodIndexArr] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handlePopoverClose = () => {
        setAnchorEl(null);
      };
  
      const open = Boolean(anchorEl);

  
      const changeFood = (e, index) => {
          handlePopoverOpen(e)
          // console.log("need to implement", index ,mealIndex)
          setFoodIndexArr([mealIndex, index])
          // nutrition.meals.[foodIndex][index] = whatever
      }


    return (
        <Grid item  > 
             {updateMode ? 
                <> 
                    <IconButton onClick={(e)=>changeFood(e, foodIndex)}><CompareArrowsIcon color="error" /></IconButton> 
                    <MealModal                           
                        open={open}
                        anchorEl={anchorEl}
                        handlePopoverClose={handlePopoverClose}
                        foodIndex={foodIndexArr}
                    /> </> : null}
            <FoodContent food={food} foodIndex={[mealIndex, foodIndex]}  updateMode={updateMode} />
        </Grid>
    )
}
