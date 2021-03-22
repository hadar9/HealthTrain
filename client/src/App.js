import React, { useEffect } from "react";
import Login from './components/Login and Register/Login'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Login and Register/Register";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./UI/Theme";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./UI/Navbar/Navbar";
import { useSelector } from "react-redux";


const App = () => {
const user = useSelector(state => state.user)

const routing = [
  { to: "/Login", name: "Login"},
  { to: "/Register", name: "Register"},
] 

const loggedInRoutes = [
  {to: "/", name: "HomePage"}
]

 return (
  <ThemeProvider theme={theme}>
    <Router>
      <>
        <div style={{ marginBottom: 80 }}>
          <Navbar routing={user ? loggedInRoutes : routing}/>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Register" component={Register} />
          </Switch>
        </div>     
      </>
    </Router>
  </ThemeProvider>
);
};

export default App;