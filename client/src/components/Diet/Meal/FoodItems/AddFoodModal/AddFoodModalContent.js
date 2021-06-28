import { Button, Typography, Input } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {SimpleSelect} from '../../../../Input/SimpleSelect';
import { updateMeal } from '../../../../../redux/reducers/UserReducer';

export const AddFoodModalContent = ({handlePopoverClose, mealIndex}) => {
    const userReducer = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const [foodNames, setFoodNames] = useState([])
    const [currentFoodItem, setCurrentFoodItem] = useState(userReducer.foodItems[0])
    const [name, setName] = useState('0')
    const [amount, setAmount] = useState(0)

    useEffect(() => {
   
        let tmp = userReducer.foodItems
        tmp = tmp.map(d => d.name + ' ' + d.amountType[0])
        setFoodNames(tmp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const onSubmit = (e) => {
      e.preventDefault() 
      const newItem = {
        amount,
        foodItem: currentFoodItem
      } 
      dispatch(updateMeal({newItem, mealIndex}))
      handlePopoverClose()
      
    } 

    const handleChange = (e) => {
      const newVal = e.target.value 
      // console.log(foodDiary.foodItems[newVal], newVal)
      setCurrentFoodItem(userReducer.foodItems[newVal])
      setName(newVal)
  }
  

    const formJSX =  <form  onSubmit={(e) =>onSubmit(e)} >
      <Typography  style={{display: 'inline-block', marginRight: '1rem'}}><b>Name: </b></Typography>
      <SimpleSelect name="name" values={foodNames.length ? foodNames : [currentFoodItem.name]} value={name} onChange={(e)=>handleChange(e)} makeUpperTag={true} label='name'/>
      <br/>
      <Typography style={{display: 'inline-block', marginRight: '1rem'}}><b>Amount: </b></Typography><Input style={{width:'3rem'}} value={amount} onChange={(e)=>setAmount(e.target.value)} name="amount" type="number" />
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
    </form> 




    return (
        <div style={{height: "15rem", width: "11rem"}}>
             {formJSX}
        </div>
    )
}
