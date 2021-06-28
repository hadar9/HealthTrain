import React, { useEffect, useState } from 'react'
import { Input} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setDate, setNutrition } from '../../../redux/reducers/FoodDiaryReducer';


export const DiaryDateSelect = (props) => {
    const date = useSelector(state => state.foodDiary.date)
    const [controledDate, setControledDate] = useState(date)
    const user = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch()

 

    const handlechange = (e)=> {
        const newDate = e.target.value
        console.log(newDate)
        setControledDate(newDate)
        dispatch(setDate({date: newDate}))  

    }



    const fetchDiary = async () => {
        try {
            props.setIsAddingMeal(false)
            props.setLoading(true)
            const id = user.user.id
            const res = await axios.get(`api/fooddiaries/getDiary/${id}/${date}`)
            console.log(res.data)
            if(res.data.error){
                props.setMsg('No Meals for this Date')
                props.setIsDiary(false)
            }
            else {
                dispatch(setNutrition({nutrition: res.data.nutrition, calories: res.data.calories }))
                props.setIsDiary(true)}
            props.setLoading(false)
        } catch (e) {
            console.log(e)
        }
    } 

    useEffect(() => {
        console.log(date)
        fetchDiary()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date])

    useEffect(() => {
        dispatch(setDate({date: new Date()}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



 

    const inputJSx = <Input style={{margin: '2rem'}} type='date' value={controledDate} onChange={(e)=>handlechange(e)}/>


    return (
        <div>
            {inputJSx}
        </div>
    )
}
