import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BoxLoading } from 'react-loadingg';
import { SemipolarLoading } from 'react-loadingg';
import { Meals } from './Meal/Meals';
import { setNutrition } from '../../redux/reducers/UserReducer';


const useStyles = makeStyles((theme) => ({
    updateMode: {
      backgroundColor: "blue",
    },
    regularMode: {
      backgroundColor: "black",
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

    const handleClick = async () => {
        const res = await axios.get(`api/diet/createDiet/${user.user.id}`)
        const {nutrition} = res.data
        setMeals(nutrition.meals)
        dispatch(setNutrition({nutrition : nutrition}))

    }

    useEffect(() => {
        const fetchDiet = async () => {
            try {
                console.log(user.user)
                const res = await axios.get(`api/diet/getDiet/${user.user.id}`)
                if(res.data.error){
                    console.log(res.data.error)
                }
                if(res.data.nutrition){
                    const {nutrition} = res.data
                    setMeals(nutrition.meals)
                    dispatch(setNutrition({nutrition : nutrition}))
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
        }
        setLoading(false)
    }, [])

    const convertToUpdateMode = () =>{
        setUpdateMode(!updateMode)
    }   


    return (
        <div>
            <Typography variant="h6"><b>Diet</b></Typography>
            {nutrition ? <Box alignItems="flex-end" justifyContent="flex-end" component={"span"} display="flex">
                <Button className={updateMode ? classes.updateMode : classes.regularMode} onClick={()=>convertToUpdateMode()} variant="contained"  color="primary">
                    {updateMode ? "Save Changes" : "Change Diet"}
                    </Button>
            </Box> : null}
            {nutrition ? null : <Button onClick={()=>handleClick()} classes={{root : "textSizeSmall"}}>Create new diet</Button>}
            {!loading ? null : <SemipolarLoading />}
            {meals.length > 0 && nutrition ? <Meals dietNotes={nutrition.dietNotes} meals={meals} updateMode={updateMode} /> : null}
        </div>
    )
}
