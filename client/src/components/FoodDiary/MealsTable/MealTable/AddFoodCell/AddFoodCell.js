import React, { useState } from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {SimpleSelect} from '../../../../Input/SimpleSelect';
import { useSelector } from 'react-redux';
import { Input } from '@material-ui/core';



export const AddFoodCell = ({amount, setAmount, setCurrentFoodItem, currentFoodItem}) => {
    const foodDiary = useSelector(state => state.foodDiary)
    const foodItemsNames = foodDiary.foodItems.map(f => f.name + ' ' + f.amountType[0])
    const [name, setName] = useState('0')


    const handleChange = (e) => {
      const newVal = e.target.value 
      // console.log(foodDiary.foodItems[newVal], newVal)
      setCurrentFoodItem(foodDiary.foodItems[newVal])
      setName(newVal)
    }

    const changeCurrentFoodItemSpecificValue = (e, attr)=> {
      const newVal = e.target.value
      let tmp = {...currentFoodItem}
      tmp[attr] = newVal
      setCurrentFoodItem(tmp)
    }

    return (
      
            <TableRow key={Math.random} >
             <TableCell component="th" scope="row"> <SimpleSelect name="name" values={foodItemsNames} value={name} onChange={(e)=>handleChange(e)} makeUpperTag={true} label='name'/></TableCell>
             <TableCell align="right"> <Input value={amount} onChange={(e)=>setAmount(e.target.value)} name="amount" type="number" label="amount" /></TableCell>
             <TableCell align="right"> <Input value={currentFoodItem.amountType} onChange={(e)=>changeCurrentFoodItemSpecificValue(e, "amountType")} name="scaleUnit" type="text" label="scale unit" /></TableCell>
             <TableCell align="right"> <Input value={currentFoodItem.foodCalories} onChange={(e)=>changeCurrentFoodItemSpecificValue(e, "foodCalories")} name="calories" type="number" label="calories" /></TableCell>
             <TableCell align="right"> <Input value={currentFoodItem.defaultAmount} onChange={(e)=>changeCurrentFoodItemSpecificValue(e, "defaultAmount")} name="defaultAmount" type="number" label="default amount" /></TableCell>
             <TableCell align="right"> <Input value={currentFoodItem.foodType} onChange={(e)=>changeCurrentFoodItemSpecificValue(e, "foodType")} name="foodType" type="text" label="food type"/></TableCell>
               </TableRow>
       
    )
}
