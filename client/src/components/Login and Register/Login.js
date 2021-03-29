import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";
import MyTextField from "../Input/Input";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {  setToken, setUser } from "../../redux/reducers/UserReducer";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email not valid")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be 4 characters or longer")
    .required("password is required"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2rem",
  },
  button: {
    backgroundColor: "#202020",
    color: "white",
  },
}));

const Login = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [errors, setErrors] = useState(null);



  useEffect(() => {
    if (user && (user.user.rank === 1 || user.user.rank === 0)) {
      history.push("/AdminPage");
    } else if (user && user.user.rank === 2){
       history.push("/");
       console.log(user)
      }
  }, [user, history]);


 
  return (
    <>
      <Grid container justify="center" style={{ marginTop: "3em" }}>
        <Grid item xs={10} sm={8} lg={6} xl={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography align="center" variant="h3">
                Login
              </Typography>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                  try {
                    const res = await axios.post("/api/login/loginUser", values);
                    const { token } = res.data;
                    dispatch(setUser({user: token}));
                    dispatch(setToken({token: token}));
                    if (user.user.rank === 1 || user.user.rank === 0) {
                      history.push("/");
                    } else {
                      console.log(user.user);
                      history.push("/");
                    }
                  } catch (e) {
                    setErrors(e.response.data.errors[0].msg);
                    actions.resetForm();
                  }
                }}
              >
                {(values, isSubmitting) => (
                  <Form>
                    <MyTextField
                 
                      name="email"
                      type="email"
                      label="Email"
                    />
                    <br />
                    <MyTextField
                 
                      name="password"
                      type="password"
                      label="Password "
                    />
                    <br />
                    <Button
                      className={classes.button}
                      variant="contained"
                      fullWidth
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Login
                    </Button>
                  </Form>
                )}
              </Formik>
              <Typography variant="h6" color="error">
                {errors}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
