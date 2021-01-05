import React, { useEffect, createContext, useReducer, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/screens/Home";
import Signin from "./components/screens/Signin";
import Signup from "./components/screens/Signup";
import Profile from "./components/screens/Profile";
import ResetPassword from "./components/screens/ResetPassword";
import NewPassword from "./components/screens/NewPassword";

import { reducer, initialState } from "./reducers/userReducer";
import { LOCAL_STORAGE_USER_KEY } from "./constants/constants";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY));
    if (user) {
      dispatch({ type: "USER", payload: user });
      history.push("/home");
    } else {
      if (!history.location.pathname.startsWith("/reset"))
        history.push("/signin");
    }
  }, []);

  return (
    <Switch>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route exact path="/reset">
        <ResetPassword />
      </Route>
      <Route path="/reset/:token">
        <NewPassword />
      </Route>
    </Switch>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </UserContext.Provider>
  );
};

export default App;
