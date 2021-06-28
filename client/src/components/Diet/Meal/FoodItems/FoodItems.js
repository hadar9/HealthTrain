import { Button, Grid } from '@material-ui/core'
import React from 'react'
import { Modaltmp } from './AddFoodModal/Modaltmp';
import {FoodItem} from './FoodItem/FoodItem'

export const FoodItems = ({mealIndex, foodItems, updateMode}) => {
    const [anchorElAddFood, setAnchorElAddFood] = React.useState(null);

   

    const handlePopoverAddFoodOpen = (event) => {
        setAnchorElAddFood(event.currentTarget);
    };
  
    const handlePopoverAddFoodClose = () => {
        setAnchorElAddFood(null);
    };
  
    const openAddFood = Boolean(anchorElAddFood);



    const addFood = (e) => {
        handlePopoverAddFoodOpen(e)
       
    }

     

    return (
        <>
            <Grid container spacing={2} direction="row">
                {foodItems?.map((f, index) => <FoodItem 
                                                    food={f} 
                                                    key={index} 
                                                    mealIndex={mealIndex} 
                                                    updateMode={updateMode} 
                                                    foodIndex={index}
                                                />
                   
                                )
                }
               
            </Grid>
            {updateMode ? <>
                <Button variant="outlined"  style={{margin: "1rem", color: "red"}} onClick={(e)=>addFood(e)}><b>add Food to this meal</b></Button>
                <Modaltmp
                    open={openAddFood}
                    anchorEl={anchorElAddFood}
                    handlePopoverClose={handlePopoverAddFoodClose}
                    mealIndex={mealIndex}
                    />
               </> : null}
        </>
    )
}
