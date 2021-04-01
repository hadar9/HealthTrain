import { Typography } from '@material-ui/core'
import React from 'react'
import { FoodNotes } from './FoodNotes'

export const FoodContent = ({food}) => {
    return (
        <div >
            <Typography>
                <b> Name:</b> {food.name}
            </Typography>
            <Typography>
                <b>Amount:</b> {food.amount}
            </Typography>
            <Typography>
                <b>Scale unit:</b> {food.amountType}
            </Typography>
            <Typography>
                <b> Calories:</b> {food.foodCalories}
            </Typography>
            {food.notes.length > 0 ? <FoodNotes notes={food.notes} /> : null}
        </div>
    )
}
