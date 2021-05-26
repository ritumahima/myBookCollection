import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PaymentDashboard from "./components/PaymentDashboard";
import NotFound from "./components/NotFound";
const Routes = (props) => (
  <Router {...props}>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/paymentDashboard">
        <PaymentDashboard />
      </Route>
      <Route exact path="/">
        <Redirect to="/paymentDashboard" />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </Router>
);
export default Routes;