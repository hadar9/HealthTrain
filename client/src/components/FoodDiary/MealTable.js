import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Typography } from '@material-ui/core';
import MyTextField from '../Input/Input';
import { Form, Formik } from 'formik';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  button : {
    margin: '1rem',
    "&:hover": { backgroundColor: "#202020", color: "white" }
  }
});

function createData(name, amount, scaleUnit, calories, defaultAmount, foodType ) {
  return { name, amount, scaleUnit, calories, defaultAmount, foodType };
}


const rowsData = [
  createData('Frozen yoghurt', 159, 'Grams', 24, 342,'protein'),
  createData('Frozen yoghurt', 159, 'Grams', 24, 342,'protein'),
  createData('Frozen yoghurt', 159, 'Grams', 24, 342,'protein'),
  createData('Frozen yoghurt', 159, 'Grams', 24, 342,'protein'),
  createData('Frozen yoghurt', 159, 'Grams', 24, 342,'protein'),
  createData('Frozen yoghurt', 159, 'Grams', 24, 342,'protein')
];



export const MealTable = ({mealName}) => {
  const classes = useStyles();
  const [rows, setRows] = React.useState([])
  const [addFoodCell, setAddFoodCell] = React.useState(false)

  React.useEffect(() => {
   setRows(rowsData)
  }, [])


  const addAnotherSlotTable = (isSubmitting) => (
  
      <TableRow key={Math.random}>
        <TableCell component="th" scope="row">
          <MyTextField
            name="name"
            type="text"
          />
        </TableCell>
        <TableCell align="right"> <MyTextField name="amount" type="number" /></TableCell>
        <TableCell align="right"> <MyTextField name="scaleUnit" type="number" /></TableCell>
        <TableCell align="right"> <MyTextField name="calories" type="number" /></TableCell>
        <TableCell align="right"> <MyTextField name="defaultAmount" type="number" /></TableCell>
        <TableCell align="right"> <MyTextField name="foodType" type="text"/></TableCell>
      
        <TableCell align="right">
          <Button 
            className={classes.button}
            variant="contained" 
            fullWidth 
            disabled={isSubmitting}
            type="submit"
                      >
                      add food
          </Button>
        </TableCell>
          </TableRow>)



  const mealTitle = mealName ? <Typography variant='h6'>{mealName}</Typography> : null

  const tableHead = (<TableHead>
    <TableRow>
      <TableCell>Name</TableCell>
      <TableCell align="right">Amount</TableCell>
      <TableCell align="right">Scale unit</TableCell>
      <TableCell align="right">Calories</TableCell>
      <TableCell align="right">Default Amount</TableCell>
      <TableCell align="right">Food Type</TableCell>
    </TableRow>
  </TableHead>)

  const initialValues = {
    name: "",
    amount: 0,
    scaleUnit: "",
    calories: 0,
    defaultAmount: 0,
    foodType: "",
  }

  const onSubmit = async (values, actions) => {
    try {
     console.log(values)
      console.log(addFoodCell)
    } catch (e) {
      console.log(e)
      actions.resetForm();
    }
  }

  const rowsMapping = (rows.map((row, index) => (
    <TableRow key={index}>
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell align="right">{row.amount}</TableCell>
      <TableCell align="right">{row.scaleUnit}</TableCell>
      <TableCell align="right">{row.calories}</TableCell>
      <TableCell align="right">{row.defaultAmount}</TableCell>
      <TableCell align="right">{row.foodType}</TableCell>
    </TableRow>
  )))


  const formBody = (values, isSubmitting) => (
  <Form> 
    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
     {tableHead}
      <TableBody>
        {rowsMapping}
        {addFoodCell ? addAnotherSlotTable(isSubmitting) : null}
      </TableBody>
    </Table>
  </TableContainer> 
  </Form>
                )


  const table = (
    <Formik initialValues={initialValues} onSubmit={onSubmit} >
      {(values, isSubmitting) => formBody(values, isSubmitting)}
    </Formik>
  )

  const addFoodButton =  addFoodCell ? null : <Button size="small" className={classes.button} variant="outlined" onClick={()=>setAddFoodCell('true')}>add food to this meal</Button>

  return (
    <>
      {mealTitle}
      <div style={{ height: 400, width: '100%' }}>
        {table}
      </div>
        {addFoodButton}
        {addFoodCell}
    </>
  );
}

