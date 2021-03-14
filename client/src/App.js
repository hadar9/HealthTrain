import React from "react";
import Login from './components/Login and Register/Login'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Login and Register/Register";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./UI/Theme";
import HomePage from "./components/HomePage/HomePage";


const App = () => {
 return (
  <ThemeProvider theme={theme}>
    <Router>
      <>
        <div style={{ marginBottom: 80 }}>
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