import { Button, Grid, IconButton } from '@material-ui/core'
import React from 'react'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
// import { useSelector } from 'react-redux';
import { MealModal } from '../MealsModal/MealModal';
import { FoodContent } from './FoodContent';
// import { AddFoodModal } from './AddFoodModal/AddFoodModal';

export const FoodItems = ({mealIndex, foodItems, updateMode}) => {
    // const nutrition = useSelector(state => state.nutrition)
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
        console.log("need to implement", index ,mealIndex)
        setFoodIndexArr([mealIndex, index])
        // nutrition.meals.[foodIndex][index] = whatever
    }

    const addFood = (e) => {
        handlePopoverOpen(e)
        console.log("need to implement" ,mealIndex)
        setFoodIndexArr([mealIndex])
        // nutrition.meals.[foodIndex][index] = whatever
    }



    return (
        <>
            <Grid container spacing={2} direction="row">
                {foodItems?.map((f, index) => 
                    <Grid item  key={f.foodItem.name} > 
                        {updateMode ? 
                            <> 
                                <IconButton onClick={(e)=>changeFood(e, index)}><CompareArrowsIcon color="error" /></IconButton> 
                                <MealModal                           
                                    open={open}
                                    anchorEl={anchorEl}
                                    handlePopoverClose={handlePopoverClose}
                                    foodIndex={foodIndexArr}
                                /> </> : null}
                        <FoodContent food={f} foodIndex={[mealIndex, index]}  updateMode={updateMode} />
                    </Grid>
            )
        }
            </Grid>
            <Button variant="outlined"  style={{margin: "1rem"}} onClick={(e)=>addFood(e)}><b>add Food to this meal</b></Button>
            {/* <AddFoodModal                           
                open={open}
                anchorEl={anchorEl}
                handlePopoverClose={handlePopoverClose}
                mealIndex={mealIndex}
            /> */}
        </>
    )
}
