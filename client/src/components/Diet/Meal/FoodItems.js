import { Grid, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import { FoodNotes } from './FoodNotes'
import CachedIcon from '@material-ui/icons/Cached';
import { useSelector } from 'react-redux';

export const FoodItems = ({foodIndex, foodItems, updateMode}) => {
    const nutrition = useSelector(state => state.nutrition)

    const changeFood = (index) => {
        console.log("need to implement", index ,foodIndex)
        // nutrition.meals.[foodIndex][index] = whatever
    }

    return (
        <>
                <Grid container spacing={2} direction="row">
            {foodItems.map((f, index) => 
                    <Grid item  key={f.name} style={{margin : "2rem"}}> 
                        {updateMode ? <IconButton onClick={()=>changeFood(index)}><CachedIcon color="error" /></IconButton> : null}
                        <Typography>
                           <b> Name:</b> {f.name}
                        </Typography>
                        <Typography>
                            <b>Amount:</b> {f.amount}
                        </Typography>
                        <Typography>
                            <b>Scale unit:</b> {f.amountType}
                        </Typography>
                        <Typography>
                           <b> Calories:</b> {f.foodCalories}
                        </Typography>
                        {f.notes.length > 0 ? <FoodNotes notes={f.notes} /> : null}
                    </Grid>
            )
        }
        </Grid>
        </>
    )
}
