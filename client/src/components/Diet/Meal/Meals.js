import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { DietNotes } from '../DietNotes'
import { FoodItems } from './FoodItems/FoodItems'


export const Meals = ({dietNotes, meals, updateMode }) => {

  
    return (
        <>
            {meals.map((m, index) =>
        
            <Grid container style={{margin : "2rem"}}  spacing={2} key={m.mealName} alignItems="center" justify="flex-start" direction="row">
                <Grid item xs={12}>
                <Typography >
                    <b>{m.mealName}</b> :
                </Typography>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <FoodItems 
                            updateMode={updateMode} 
                            foodIndex={index} 
                            foodItems={m.foodItems}
                 
                        />
                    </div>
                </Grid>
            </Grid>
           )}
           {dietNotes.length > 0 ? <DietNotes dietNotes={dietNotes} /> : null}
        </>
    )
}
