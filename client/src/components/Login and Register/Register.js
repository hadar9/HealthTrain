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
import axios from "axios"
import { useHistory } from "react-router";



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
  const history = useHistory()

 
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
                name: "",
                email: "",
                password: "",
                repass: "",
              }}
            
              onSubmit={async (values, actions) => {

                const res = await axios.post("api/register/registerUser", values)
                console.log(res)
                history.push("/")

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
                    name="email"
                    type="email"
                    label="Email "
                  />
                  <br />
                  <MyTextField      
                    name="password"
                    type="password"
                    label="Password "
                  />
                  <br />
                  <MyTextField                
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
