import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateNutritionMeals } from '../../../../../redux/reducers/FoodDiaryReducer';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {IconButton} from '@material-ui/core';


export const DeleteMeal = ({mealIndex}) => {
    const foodDiary = useSelector(state => state.foodDiary)
    const dispatch = useDispatch()

    const deleteMeal = () => {
        const updatedMeals = foodDiary.nutrition.meals.filter((m, index)=> index !== mealIndex)
        dispatch(updateNutritionMeals({newItem: updatedMeals}))
    }

    return (
        <IconButton onClick={()=>deleteMeal()}><HighlightOffIcon style={{color: 'red'}}/></IconButton>
    )
}
