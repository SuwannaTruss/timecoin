import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ProvideAuth from "./components/ProvideAuth";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="App container p-5">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          {/* <Route path="/register">
              <Register />
            </Route>
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
