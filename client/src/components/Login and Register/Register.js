import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  Card,
  CardContent,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import MyTextField from "../Input/Input";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios"
import { useHistory } from "react-router";
import MySelect from "../Input/MySelect";
import * as Yup from "yup";


const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required"),
  email: Yup.string()
    .email("Email not valid")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be 4 characters or longer")
    .required("password is required"),
  repass: Yup.string()
    .min(4, "Password must be 4 characters or longer")
    .required("password is required"),
  height: Yup.number()
    .required("Height is required"),
  weight: Yup.number()
    .required("Weight is required"),
  goalWeight: Yup.number()
    .required("Goal is required"),
  age: Yup.number()
    .min(18, "Age must be 18 or higher")
    .max(80, "Age must be 80 or lower")
    .required("Age is required"),
});


const useStyles = makeStyles({
  root: {
    marginTop: "2rem",
  },
  title: {
    fontSize: 14,
  },
  button: {
    backgroundColor: "#202020",
    color: "white",
  },
  fields : {
    marginBottom : "1rem"
  }
});



const Register = () => {
  const classes = useStyles();
  const history = useHistory()
  const [gender, setGender] = useState('0')

  const fields = [
    { name: 'name', type: 'text', label: 'Name'},
    { name: 'email', type: 'text', label: 'Email'},
     {name: 'password', type: 'text', label: 'Password'},
    { name: 'repass', type: 'text', label: 'Renter password'},
     {name: 'height', type: 'number', label: 'Height'},
     {name: 'weight', type: 'number', label: 'Weight'},
     {name: 'goalWeight', type: 'number', label: 'Goal Weight'},
     {name: 'gender', type: 'select', label: 'Gender', values: ["Male", "Female"]},
     {name: 'age', type: 'number', label: 'Age'}      
   ]
   
   const formFields = fields.map( f => (
     f.values ? 
      <div key={f.name}>
        <MySelect   
            className={classes.fields}            
            name={f.name}
            label={f.label}
            values={f.values}
            value={gender}
            onChange={(e)=>setGender(e.target.value)}
          />
          <br />
      </div>
      :
      <div key={f.name}>
         <MyTextField     
                    className={classes.fields}           
                    name={f.name}
                    type={f.type}
                    label={f.label}
                  />
                  <br />
      </div>
   ))

   const onSubmit = async (values, actions) => {
    try {
      console.log(values)
      values.gender = values.gender ? "Female" : "Male"
      const res = await axios.post("api/register/registerUser", values)
      console.log(res)

      history.push("/Login")
      return


    } catch (e) {
      console.log(e);
    }
    actions.resetForm();
  }

  const initialValues = {
    name: "",
    email: "",
    password: "",
    repass: "",
    height: 0,
    weight: 0,
    goalWeight: 0,
    gender: 0,
    age: 0,
  }
   

 
  return (
    <Grid container justify="center" style={{ marginTop: "3em" }}>
      <Grid item xs={10} sm={8} lg={6}>
        <Card className={classes.root}>
          <CardContent>
            <Typography align="center" variant="h3">
              Register
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(values, isSubmitting) => (
                <Form>
                  {formFields}             
                  <Button
                    className={classes.button}
                    variant="contained"
                    fullWidth
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Register;
