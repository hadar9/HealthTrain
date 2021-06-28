import React from "react";
import {
  Button,
  TextField
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setNutrition } from "../../../../redux/reducers/FoodDiaryReducer";




export const NewMealForm = ({setIsAddingMeal, setIsDiary}) => {
    const [mealname, setMealname] = React.useState('')
    const foodDiary = useSelector(state => state.foodDiary)
    const dispatch = useDispatch()

    const handleClick = () => {

        const newMeal = {
            mealName: mealname,
            foodItems: []
        }
        const updatedMeals = foodDiary.nutrition ? [...foodDiary.nutrition.meals, newMeal] : [newMeal]
        const updatedNutrition = {
            dietNotes: [],
            meals: updatedMeals
        }

        dispatch(setNutrition({nutrition: updatedNutrition}))
        setMealname('')
        setIsAddingMeal(false)
        setIsDiary(true)

    }



    return (
       <div align='center'>
            <TextField 
                type='text' 
                label='Meal Name' 
                value={mealname} 
                onChange={(e)=>setMealname(e.target.value)} 
                style={{marginLeft: '2rem'}}
                />
            <Button onClick={()=>handleClick()} variant='outlined' style={{marginLeft: '2rem'}}>confirm name</Button>
       </div>
    )
}
