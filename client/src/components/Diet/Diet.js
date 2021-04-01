import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BoxLoading } from 'react-loadingg';
import { SemipolarLoading } from 'react-loadingg';
import { Meals } from './Meal/Meals';
import { setCaloriesSum, setNutrition } from '../../redux/reducers/UserReducer';


const useStyles = makeStyles((theme) => ({
    updateMode: {
      backgroundColor: "blue",
      "&:hover": { opacity: 0.7, backgroundColor: "blue" },
    },
    regularMode: {
      backgroundColor: "black",
    },
    redCalories: {
      marginRight: "2rem",  
      color: "red",
      display: 'inline-block'
     

    },
    calories: {
      color: "black",
      display: 'inline-block'
    
 
    },
  }));

export const Diet = () => {
    const classes = useStyles();
    const user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const [updateMode, setUpdateMode] = useState(false)
    const [meals, setMeals] = useState([])
    const dispatch = useDispatch()
    const nutrition = useSelector(state => state.nutrition)
    const calories = useSelector(state => state.calories)
    const caloriesSum = useSelector(state => state.caloriesSum)
    const lowCaloriesAlert = "You need to add calories  your goal is " + calories
    const highCaloriesAlert = "You need to reduce calories your goal is " + calories


    const calcCalories = () => {
        return nutrition.meals.reduce((a,b)=>{
            const mealCalories = b.foodItems.reduce((c,d) => c + d.foodCalories *( d.amountType === "Grams" ? d.amount / 100 : d.amount), 0)
            return a + mealCalories
        }, 0)
    }

    // create new diet
    const handleClick = async () => {
        const res = await axios.get(`api/diet/createDiet/${user.user.id}`)
        const {nutrition, calories} = res.data
        setMeals(nutrition.meals)
        dispatch(setCaloriesSum({caloriesSum: calories}))
        dispatch(setNutrition({nutrition, calories}))

    }

    // handle diet load
    useEffect(() => {
        console.log(nutrition.meals.reduce((a,b)=>{
            const mealCalories = b.foodItems.reduce((c,d) => c + d.foodCalories *( d.amountType === "Grams" ? d.amount / 100 : d.amount), 0)
            return a + mealCalories
        }, 0))
        const fetchDiet = async () => {
            try {
                console.log(user.user)
                const res = await axios.get(`api/diet/getDiet/${user.user.id}`)
                if(res.data.error){
                    console.log(res.data.error)
                }
                if(res.data.nutrition){
                    const {nutrition, calories} = res.data
                    setMeals(nutrition.meals)
                    dispatch(setCaloriesSum({caloriesSum: calories}))
                    dispatch(setNutrition({nutrition, calories}))
                }
                   
            }
            catch(e){
                console.log(e)
            }
        }
        setLoading(true)
        if(!nutrition){
            fetchDiet()
        }
        else {
            setMeals(nutrition.meals)
            dispatch(setCaloriesSum({caloriesSum: calories}))
        }
        setLoading(false)
    }, [nutrition])


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

    const diffrentCaloriesAlerts = (
        <>
            <Typography  
                className={classes.redCalories}
                variant="subtitle1">
                        <b>{calories && caloriesSum < calories ? lowCaloriesAlert : null }</b>
            </Typography>
            <Typography  
                className={classes.redCalories} 
                variant="subtitle1">
                    <b>{calories && caloriesSum > calories ? highCaloriesAlert : null }</b>
            </Typography>

        </>
    )

    const caloriesTitle = (
        <>
            <Typography style={{display: 'inline-block', marginRight : "1rem"}}  variant="h6"><b>Calories:</b></Typography>
            <Typography  className={updateMode ? classes.redCalories : classes.calories} variant="h6"><b>{caloriesSum ? caloriesSum : null }</b></Typography>
        </>
    )


    const topPart = () => (
        <>
            {caloriesTitle}
            {diffrentCaloriesAlerts}
            {nutrition ? <Box alignItems="flex-end" justifyContent="flex-end" component={"span"} display="flex">
                <Button className={updateMode ? classes.updateMode : classes.regularMode} onClick={()=>convertToUpdateMode()} variant="contained"  color="primary">
                    {updateMode ? "Save Changes" : "Change Diet"}
                    </Button>
            </Box> : null}
            {nutrition ? null : <Button onClick={()=>handleClick()} classes={{root : "textSizeSmall"}}>Create new diet</Button>}
            {!loading ? null : <SemipolarLoading />}
        </>
    )


    return (
        <div>
            <Typography variant="h6"><b>Diet</b></Typography>
            {topPart()}
            {meals.length > 0 && nutrition ? 
                <Meals 
                    dietNotes={nutrition.dietNotes} 
                    meals={meals} 
                    updateMode={updateMode} 
            
                    /> 
                : null}
        </div>
    )
}
