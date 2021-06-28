import React from 'react'
import {Button } from '@material-ui/core'
import axios from 'axios'



export const SaveSearchFoodItem = ({setLoading, resultItem, setMsg, foodType, amountType}) => {

    const saveFoodToDB = async () => {
        try {  
            setLoading(false)
            const values = {
                name: resultItem.name, 
                amountType: amountType, 
                defaultAmount: resultItem.serving_size_g, 
                foodCalories: resultItem.calories, 
                foodType: foodType
            }
            const {data} = await axios.post('api/foodItem/createFoodItem', values) 
            console.log(data)
            if(data.error){
                setMsg('This item already saved')
            }
            else{
                setMsg('Food Saved Successfully')
            }
            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <Button variant='contained' color='primary' style={{margin: '2rem'}} onClick={()=>saveFoodToDB()}>Save This Food</Button>
    )
}
