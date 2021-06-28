import { Typography } from '@material-ui/core'
import {MealsTable} from './MealsTable/MealsTable'
import {AddDiaryMeal} from './AddDiaryMeal/AddDiaryMeal'
import {DiaryDateSelect} from './DiaryDateSelect/DiaryDateSelect'
import {FoodDiarySaveButton} from './FoodDiarySaveButton/FoodDiarySaveButton'
import {NewMealForm} from './AddDiaryMeal/NewMealForm/NewMealForm'
import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { fetchAllFoodItems } from '../../redux/reducers/FoodDiaryReducer'


export const FoodDiary = () => {
    const [msg, setMsg] = useState('')
    const [isDiary, setIsDiary] = useState(false)
    const [loading, setLoading] = useState(false)
    const [savedDiaryMsg, setSavedDiaryMsg] = useState('')
    const [isAddingMeal, setIsAddingMeal] = useState(false)
    const foodDiary = useSelector(state => state.foodDiary)
    const user = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch()

    const saveDiary = async () => {
        // console.log(foodDiary.nutrition.meals[0].foodItems)
        const values = {
            user: user.user.id,
            date: foodDiary.date,
            calories: foodDiary.calories,
            nutrition: foodDiary.nutrition,

        }
        const res = await axios.post('api/fooddiaries/createOrUpdateDiary', values)
        console.log(res.data)
        setSavedDiaryMsg(res.data)
    }

    useEffect(() => {

        dispatch(fetchAllFoodItems())

        return () => {
            if(foodDiary.nutrition){
                saveDiary()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const title = <Typography style={{margin: "2rem"}} align="center" variant="h5"><b>Food Diary</b></Typography>
    const message = <Typography align='center' variant='h6' style={{margin: '2rem', fontWeight: 'bold'}}>{msg}</Typography>
    const loadingJsx = <div style={{textAlign: 'center'}} ><CircularProgress /></div>


    return (
        <div>
            {title}
            <DiaryDateSelect setIsAddingMeal={setIsAddingMeal} setIsDiary={setIsDiary} setMsg={setMsg} loadingJsx={loadingJsx} setLoading={setLoading} />
            {loading ? loadingJsx : (isDiary ? <MealsTable /> : message || null)}
            {isAddingMeal && <NewMealForm setIsDiary={setIsDiary} setIsAddingMeal={setIsAddingMeal} />}
            <AddDiaryMeal  setIsAddingMeal={setIsAddingMeal} />
            <FoodDiarySaveButton saveDiary={saveDiary} />
            {savedDiaryMsg.length ? <Typography  align='center' color='primary' style={{fontWeight: 'bold'}}>{savedDiaryMsg}</Typography> : null}
        </div>
    )
}
