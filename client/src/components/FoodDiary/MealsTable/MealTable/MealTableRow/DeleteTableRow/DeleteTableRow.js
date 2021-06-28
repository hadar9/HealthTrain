import React from 'react'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {IconButton} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { updateMeal } from '../../../../../../redux/reducers/FoodDiaryReducer';


export const DeleteTableRow = ({mealIndex, rowIndex}) => {
    const foodDiary = useSelector(state => state.foodDiary)
    const dispatch = useDispatch()

    const handleFoodItemDelete = () => {
        let tmpMeal = foodDiary.nutrition.meals[mealIndex]
        let updatedFoodItems = tmpMeal.foodItems.filter((f, index)=> index !== rowIndex)
        // console.log(updatedFoodItems)
        let updatedMeal = {mealName: tmpMeal.mealName, foodItems: updatedFoodItems}
        dispatch(updateMeal({newItem: updatedMeal, mealIndex: mealIndex}))
    }

    return (
        <div>
            <IconButton onClick={() => handleFoodItemDelete()}><HighlightOffIcon style={{color:'red'}} /></IconButton>
        </div>
    )
}
