import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Typography, Box, IconButton } from '@material-ui/core';
import {AddFoodCell} from './AddFoodCell/AddFoodCell'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFoodItems, updateMeal } from '../../../../redux/reducers/FoodDiaryReducer';
import {MealTableRow} from './MealTableRow/MealTableRow'
import {DeleteMeal} from './DeleteMeal/DeleteMeal'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import axios from 'axios';


const useStyles = makeStyles({
    table: {
      minWidth: 800,
    },
    button : {
      margin: '1rem',
      backgroundColor: "#202020",
      color: "white",
      "&:hover": { backgroundColor: "white", color: "black" }
    }
  });
  
  function createData(id, name, amount, scaleUnit, calories, defaultAmount, foodType ) {
    return {id, name, amount, scaleUnit, calories, defaultAmount, foodType };
    // add notes of food item later
  }
  


export const MealTable = ({meal, mealIndex}) => {
    const classes = useStyles();
    const [rows, setRows] = React.useState([])
    const [addFoodCell, setAddFoodCell] = React.useState(false)
    const [amount, setAmount] = React.useState(0)
    const foodDiary = useSelector(state => state.foodDiary)
    const [currentFoodItem, setCurrentFoodItem] = React.useState(foodDiary.foodItems[0])
    const dispatch = useDispatch()

    const makeRowsData = () => {
      let id = 1
      const rowsData = meal.foodItems.map(f=>{
        const {foodItem} = f

        return createData(
            id++,
            foodItem.name, 
            f.amount,
            foodItem.amountType,
            foodItem.foodCalories,
            foodItem.defaultAmount,
            foodItem.foodType,
            )
    })
    setRows(rowsData)
    }

    React.useEffect(() => {
      makeRowsData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
       }, [foodDiary.nutrition.meals])

    React.useEffect(() => {
      setCurrentFoodItem(foodDiary.foodItems[0])
       }, [foodDiary.foodItems])

     
       const mealTitle = meal.mealName ? <Typography variant='h6' style={{margin: '1rem'}}>{meal.mealName}</Typography> : null
     
       const tableHead = (<TableHead>
         <TableRow>
           <TableCell>Name</TableCell>
           <TableCell >Amount</TableCell>
           <TableCell >Scale unit</TableCell>
           <TableCell >Calories</TableCell>
           <TableCell >Default Amount</TableCell>
           <TableCell >Food Type</TableCell>
         </TableRow>
       </TableHead>)

       const compareDBFoodItemWithNew = (dbItem, newItem)=>{
        console.log(dbItem, newItem)
        if(dbItem.amountType !== newItem.amountType || dbItem.foodCalories !== newItem.foodCalories || dbItem.defaultAmount !== newItem.defaultAmount )
          return true
        return false
      }

      const findFoodItemByID = (id)=>{
        let res
        foodDiary.foodItems.forEach(f => {
          if(f._id === id) res = f
        });
        return res
      }


      const createNewFoodItem = async ()=> {
        try {
          const res = axios.post('api/fooditem/createFoodItem',currentFoodItem)  
          console.log(res.data)
          if(!res.data.error){
            setCurrentFoodItem({...currentFoodItem, _id: res.data._id})
          }
        } catch (e) {
          console.log(e)
        }
      }
       
     
     
       const onSubmit = async (e) => {
         try {
          e.preventDefault()
          const isFoodItemChanged = compareDBFoodItemWithNew(findFoodItemByID(currentFoodItem._id),currentFoodItem)
          console.log(isFoodItemChanged)
          if(isFoodItemChanged) await createNewFoodItem()
          const {_id, defaultAmount, name, amountType, foodCalories, foodType} = currentFoodItem
          const newFoodItem = {_id, defaultAmount, notes: [], name, amountType, foodCalories, foodType}
          const newMealItem = {amount: amount, foodItem: newFoodItem}
          let updatedMeal = {mealName: meal.mealName, foodItems: [...meal.foodItems, newMealItem]}
          console.log(currentFoodItem._id)
          dispatch(updateMeal({newItem: updatedMeal, mealIndex: mealIndex}))
          if(isFoodItemChanged) await dispatch(fetchAllFoodItems())
         } catch (e) {
           console.log(e)
         }
       }
     
       const rowsMapping = rows.length ? (rows.map((row, index) => {
         return(
          <MealTableRow key={row.id} row={row} mealIndex={mealIndex} rowIndex={index}/>
       )})) : null
     
       const submitButtons =  (
         <>
           <Button 
             className={classes.button}
             variant="contained" 
             type="submit"
                   >
                 add food
           </Button>
           <Button 
             className={classes.button}
             variant="contained" 
             onClick={()=> setAddFoodCell(false)}
                   >
                 cancle
           </Button>
         </>
       )
     
     
       const formBody = (
       <form onSubmit={(e)=>onSubmit(e)}> 
         <TableContainer component={Paper}>
         <Table className={classes.table} aria-label="simple table">
          {tableHead}
           <TableBody>
             {rowsMapping}
             {addFoodCell ? <AddFoodCell amount={amount} setAmount={setAmount} currentFoodItem={currentFoodItem} setCurrentFoodItem={setCurrentFoodItem} /> : null}
           </TableBody>
         </Table>
       </TableContainer> 
         {addFoodCell && submitButtons}
       </form>
                     )
     
     
       const table = (
         <div style={{  width: '100%' }}>
           {formBody}      
         </div>
       )
     
       const addFoodButton =  addFoodCell ? null : <IconButton  variant="outlined" onClick={()=>setAddFoodCell('true')}><AddCircleOutlineIcon style={{color: 'blue'}}/></IconButton>
     
    return (
        <div>
            {mealTitle}
            {table}
            <Box align='center'>
              {addFoodButton}
              <DeleteMeal mealIndex={mealIndex} />
            </Box>
            
        </div>
    )
}
