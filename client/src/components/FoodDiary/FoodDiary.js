import { Typography } from '@material-ui/core'
import {MealTable} from './MealTable'
import React from 'react'

export const FoodDiary = () => {



    const title = <Typography style={{margin: "1rem"}} align="center" variant="h5"><b>Food Diary</b></Typography>

    return (
        <div>
            {title}
            <MealTable mealName={"Breakfast"} />
        </div>
    )
}
