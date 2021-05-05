import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import MyTextField from '../../../../Input/Input'
import { useDispatch, useSelector } from 'react-redux';
import MySelect from '../../../../Input/MySelect';
import axios from 'axios'

export const AddFoodModalContent = ({mealIndex}) => {
    const nutrition = useSelector(state => state.nutrition)
    const [foodItems, setFoodItems] = useState([])
    const [foodNamesArr, setfoodNamesArr] = useState([])
    // const caloriesSum = useSelector(state => state.caloriesSum)
    // const dispatch = useDispatch()
    const [meal, setMeal] = useState(null)


    useEffect(() => {
       setMeal(nutrition.meals[mealIndex].foodItems)
    //    console.log(nutrition.meals[mealIndex].foodItems)
       const getAllFoodItems = async () => {
           const {data} = await axios.get("/api/foodItem/getAllFoodItems")
        //    console.log(...foodItems,data)
        //    console.log(data)
           setFoodItems(data)
       }
       getAllFoodItems()
    }, [])

    useEffect(() => {
    //  console.log(foodItems)
     if(foodItems.length){
        const tmp = foodItems.map(f => f.name)
        setfoodNamesArr(tmp)
     }
    
    }, [foodItems])

    return (
        <div style={{height: "20rem", width: "15rem" , overflowY: "scroll"}}>
            {/* <MySelect
              label={"name"}
              values={foodNamesArr.length ? foodNamesArr : []}
              value={'0'}
            />  */}
            <Button
                color="primary"
                variant="contained"
                type="submit"
            >
                Confirm
            </Button>
              
            
        </div>
    )
}
