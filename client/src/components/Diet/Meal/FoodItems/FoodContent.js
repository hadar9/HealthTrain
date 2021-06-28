import { IconButton, Typography } from '@material-ui/core'
import React from 'react'
import { FoodNotes } from './FoodNotes'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFood } from '../../../../redux/reducers/UserReducer';


export const FoodContent = ({food, foodIndex, updateMode}) => {
    const nutrition = useSelector(state => state.userReducer.nutrition)
    const dispatch = useDispatch()
    // console.log(food)

    const deleteFoodItem = () => {
        console.log(nutrition.meals)
        console.log(nutrition.meals[foodIndex[0]].foodItems[foodIndex[1]])
        dispatch(deleteFood({indexes: foodIndex}))
    }
    


    return (
        <div >
            <Typography>
                <b> Name:</b> {food.foodItem.name}
            </Typography>
            <Typography>
                <b>Amount:</b> {food.amount}
            </Typography>
            <Typography>
                <b>Scale unit:</b> {food.foodItem.amountType}
            </Typography>
            <Typography>
                <b> Calories:</b> {food.foodItem.foodCalories}
            </Typography>
            <Typography>
                <b> Default Amount:</b> {food.foodItem.defaultAmount}
            </Typography>
            <Typography>
                <b> Food Type:</b> {food.foodItem.foodType}
            </Typography>
            {food.foodItem.notes.length > 0 ? <FoodNotes notes={food.foodItem.notes} /> : null}
            {updateMode ? <IconButton onClick={()=>deleteFoodItem()}>
                <HighlightOffIcon color="error" />
            </IconButton> : null}

        </div>
    )
}
