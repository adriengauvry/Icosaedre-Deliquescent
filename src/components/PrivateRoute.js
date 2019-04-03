import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { getUser } from "../lib/userData/manager";

class PrivateRoute extends Route {
  render() {
    if (getUser()) {
      return super.render()
    }
    else {
      return <Redirect to='/' />
    }
  }
}

export default PrivateRoute;
