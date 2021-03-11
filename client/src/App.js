import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ProvideAuth from "./components/ProvideAuth";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import Services from "./components/Services";
import Service from "./components/Service";
import Wallet from "./components/Wallet";
import NewService from "./components/NewService";
import Home from "./components/Home";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <NavBar />
        <div className="App container p-5">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute>
            <Route path="/service/:id">
              <Service />
            </Route>
            <Route path="/services">
              <Services />
            </Route>

            <PrivateRoute path="/new-service">
              <NewService />
            </PrivateRoute>
            <Route path="/wallet">
              <Wallet />
            </Route>
            <PrivateRoute path="/home">
              <Home />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
