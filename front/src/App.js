import React, { createContext, useReducer } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Switch } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./Component/About";
import Home from "./Component/Home";
import Navbar from "./Component/Navbar";
import Signin from "./Component/Signin";
import Signup from "./Component/Signup";
import Logout from "./Component/Logout";
import { initialState, reducer } from "../src/reducer/UseReducer";

export const UserContext = createContext();
const Routing = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/about">
        <About />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <Route path="/signin">
        <Signin />
      </Route>

      <Route path="/logout">
        <Logout />
      </Route>
    </Switch>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </div>
  );
};

export default App;
