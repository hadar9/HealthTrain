import { Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Meals } from './Meal/Meals';
import { fetchAllFoodItems, setCaloriesSum, setNutrition } from '../../redux/reducers/UserReducer';
import {DietHeader} from './DietHeader/DietHeader'




export const Diet = () => {
    const user = useSelector(state => state.userReducer.user)
    const [loading, setLoading] = useState(false)
    const [updateMode, setUpdateMode] = useState(false)
    const dispatch = useDispatch()
    const nutrition = useSelector(state => state.userReducer.nutrition)
    const calories = useSelector(state => state.userReducer.calories)


    // const calcCalories = () => {
    //     return nutrition.meals.reduce((a,b)=>{
    //         const mealCalories = b.foodItems.reduce((c,d) => c + d.foodCalories *( d.amountType === "Grams" ? d.amount / 100 : d.amount), 0)
    //         return a + mealCalories
    //     }, 0)
    // }

    // create new diet
    const handleClick = async () => {
        const res = await axios.get(`api/diet/createDiet/${user.user.id}`)
        const {nutrition, calories} = res.data
        dispatch(setCaloriesSum({caloriesSum: calories}))
        dispatch(setNutrition({nutrition, calories}))

    }

    // handle diet load
    useEffect(() => {
        const fetchDiet = async () => {
            try {
                setLoading(true)
                console.log(user.user)
                const res = await axios.get(`api/diet/getDiet/${user.user.id}`)
                if(res.data.error){
                    console.log(res.data.error)
                }
                if(res.data.nutrition){
                    const {nutrition, calories} = res.data
                    dispatch(setCaloriesSum({caloriesSum: calories}))
                    dispatch(setNutrition({nutrition, calories}))
                }
                setLoading(false) 
            }
            catch(e){
                console.log(e)
            }
        }
        
        if(!nutrition){
            fetchDiet()
        }
        else {
            dispatch(setCaloriesSum({caloriesSum: calories}))
        }
        // setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nutrition])


    // load foodItems
    useEffect(() => {
       dispatch(fetchAllFoodItems())
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const saveChanges = async () => {
        try {
            const res = await axios.post("api/diet/updateDiet", {nutrition: nutrition, userID: user.user.id} )
            console.log(res)
            
        } catch (e) {
            console.log(e)
        }
    }

    const convertToUpdateMode = () =>{
        setUpdateMode(!updateMode)
        if(updateMode){
            saveChanges()
        }
    }   



    return (
        <div>
            <Typography align="center" variant="h4"><b>Diet</b></Typography>
            <DietHeader  
                handleClick={handleClick} 
                updateMode={updateMode} 
                loading={loading} 
                convertToUpdateMode={convertToUpdateMode}
                />
                
            {nutrition && nutrition.meals.length > 0? 
                <Meals 
                    dietNotes={nutrition.dietNotes} 
                    meals={nutrition.meals} 
                    updateMode={updateMode} 
            
                    /> 
                : null}
        </div>
    )
}
