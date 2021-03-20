import React from "react";
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
});

const Register = () => {
  const classes = useStyles();

 
  return (
    <Grid container justify="center" style={{ marginTop: "3em" }}>
      <Grid item xs={10} sm={8} lg={6}>
        <Card className={classes.root}>
          <CardContent>
            <Typography align="center" variant="h3">
              Register
            </Typography>
            <Formik
              initialValues={{
                email: "",
                name: "",
                password: "",
                repass: "",
              }}
            
              onSubmit={async (values, actions) => {
              
                try {
                
                } catch (e) {
                  console.log(e);
                }
                actions.resetForm();
              }}
            >
              {(values, isSubmitting) => (
                <Form>
                  <MyTextField key="1" name="name" type="text" label="Name " />
                  <br />
                  <MyTextField
                    key="3"
                    name="email"
                    type="email"
                    label="Email "
                  />
                  <br />
                  <MyTextField
                    key="4"
                    name="password"
                    type="password"
                    label="Password "
                  />
                  <br />
                  <MyTextField
                    key="5"
                    name="repass"
                    type="password"
                    label="Renter password "
                  />
                  <br />
                
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
