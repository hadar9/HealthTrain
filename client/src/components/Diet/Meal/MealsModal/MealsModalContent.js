import { Button, Input, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateFood } from '../../../../redux/reducers/UserReducer';
import {SimpleSelect} from '../../../Input/SimpleSelect';


export const MealsModalContent = ({foodIndex, handleClose}) => {
    const nutrition = useSelector(state => state.userReducer.nutrition)
    const userReducer = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const food = nutrition.meals[foodIndex[0]].foodItems[foodIndex[1]]
    const [foodNames, setFoodNames] = useState([])
    const [currentFoodItem, setCurrentFoodItem] = useState(null)
    const [name, setName] = useState('')
    const [amount, setAmount] = useState(food.amount)

    useEffect(() => {
      // console.log(food)
      userReducer.foodItems.forEach(f => {
        if(f._id === food.foodItem._id) {
          setCurrentFoodItem(f)
          // console.log(f)
        }
      });

        let tmp = userReducer.foodItems
        tmp.forEach((t, index) => {
          if(t.name === food.foodItem.name && t.amountType === food.foodItem.amountType) setName(index)
        });
        tmp = tmp.map(d => d.name + ' ' + d.amountType[0])
        setFoodNames(tmp)
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


  

    const onSubmit = (e) => {
        try {
          // console.log(foodIndex, currentFoodItem)
          e.preventDefault()
          const newItem = {
                            amount,
                            foodItem: currentFoodItem
                          } 
          dispatch(updateFood({indexes: foodIndex, newItem: newItem}))
          handleClose()
        } catch (e) {
            console.log(e)
        }
    }


  const handleChange = (e) => {
    const newVal = e.target.value 
    // console.log(foodDiary.foodItems[newVal], newVal)
    setCurrentFoodItem(userReducer.foodItems[newVal])
    setName(newVal)
}

    const formJSX = food ?  
        <form  onSubmit={(e) =>onSubmit(e)} >
          <Typography  style={{display: 'inline-block', marginRight: '1rem'}}><b>Name: </b></Typography>
          <SimpleSelect name="name" values={foodNames} value={name} onChange={(e)=>handleChange(e)} makeUpperTag={true} label='name'/>
          <br/>
          <Typography style={{display: 'inline-block', marginRight: '1rem'}}><b>Amount: </b></Typography><Input style={{width:'3rem'}} value={amount} onChange={(e)=>setAmount(e.target.value)} name="amount" type="number"  />
          <Typography><b>Scale Unit: </b> {currentFoodItem ? currentFoodItem.amountType : null}</Typography>
          <Typography><b>Calories: </b> {currentFoodItem ? currentFoodItem.foodCalories : null}</Typography>
          <Typography><b>Default Amount: </b> {currentFoodItem ? currentFoodItem.defaultAmount : null}</Typography>
          <Typography><b>Food Type: </b> {currentFoodItem ? currentFoodItem.foodType : null}</Typography> 
          <Button
            color="primary"
            variant="contained"
            type="submit"
            style={{marginTop: '1rem'}}
          >
            Confirm
          </Button>
        </form> : null 


    return (
      //  overflowY: "scroll"
        <div style={{height: "15rem", width: "11rem" }}>
             {formJSX}
        </div>
    )
}
