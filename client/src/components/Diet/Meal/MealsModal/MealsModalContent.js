import { Button } from '@material-ui/core'
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import MyTextField from '../../../Input/Input'
import { useDispatch, useSelector } from 'react-redux';
// import { setNutrition, updateFood } from '../../../../redux/reducers/UserReducer';
import MySelect from '../../../Input/MySelect';

export const MealsModalContent = ({foodIndex, handleClose}) => {
    const nutrition = useSelector(state => state.nutrition)
    const caloriesSum = useSelector(state => state.caloriesSum)
    const dispatch = useDispatch()
    const [food, setFood] = useState(nutrition.meals[foodIndex[0]].foodItems[foodIndex[1]])

    const fieldValues = [
        {name: "name" , type:  "text", label: "Name: "},
        {name: "amount" , type:  "number", label: "Amount: "},
        {name: "amountType" , type:  "text", label: "Scale unit: "},
        {name: "foodCalories" , type:  "number", label: "Calories: "},
    ]

    const makeFields = fieldValues.map((f) => {
        if(f.name === "name"){
         return (
          <MySelect
              key={f.name}
              name={f.name}
              label={f.label}
              values={[food.foodItem.name, "item1", "item2"]}
              value={'0'}
            />              
            )    
        }   
        else {
          return ( 
            <MyTextField  
              key={f.name}           
              name={f.name}
              type={f.type}
              label={f.label}
              />
              )
        }
      
    })
                       
     


    const onSubmit = (values) => {
        try {
          // values.notes = ["no notes"]  
          // dispatch(updateFood({indexes: foodIndex, newItem: values}))
          // handleClose()
          console.log(values)
        } catch (e) {
            console.log(e)
        }
    }


    // useEffect(() => {
    //    setFood(nutrition.meals[foodIndex[0]].foodItems[foodIndex[1]])
    //    console.log(nutrition.meals[foodIndex[0]].foodItems[foodIndex[1]])
    // }, [foodIndex])

    return (
        <div style={{height: "20rem", width: "15rem" , overflowY: "scroll"}}>
             {food ?  <Formik
                initialValues={{
                  name: "",
                  amount: food.amount,
                  amountType: food.foodItem.amountType,
                  foodCalories: food.foodItem.foodCalories,
                }}
                // validationSchema={validationSchema}
                onSubmit={(values, actions) =>onSubmit(values, actions)}
              >
                {(values, isSubmitting) => (
                  <Form>
                    {makeFields}
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Confirm
                    </Button>
                  </Form>
                )}
              </Formik> : null}
        </div>
    )
}
