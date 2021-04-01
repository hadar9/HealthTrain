import { Grid, IconButton } from '@material-ui/core'
import React from 'react'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
// import { useSelector } from 'react-redux';
import { MealModal } from '../MealsModal/MealModal';
import { FoodContent } from './FoodContent';

export const FoodItems = ({foodIndex, foodItems, updateMode}) => {
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
        console.log("need to implement", index ,foodIndex)
        setFoodIndexArr([foodIndex, index])
        // nutrition.meals.[foodIndex][index] = whatever
    }



    return (
        <>
            <Grid container spacing={2} direction="row">
                {foodItems?.map((f, index) => 
                    <Grid item  key={f.name} > 
                        {updateMode ? 
                            <> 
                                <IconButton onClick={(e)=>changeFood(e, index)}><CompareArrowsIcon color="error" /></IconButton> 
                                <MealModal                           
                                    open={open}
                                    anchorEl={anchorEl}
                                    handlePopoverClose={handlePopoverClose}
                                    foodIndex={foodIndexArr}
                                /> </> : null}
                        <FoodContent food={f} />
            </Grid>
            )
        }
        </Grid>
        </>
    )
}
