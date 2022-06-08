import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useUserContext } from "../../context/user";
export const PrivateRoute = ({ children, ...props }) => {
  const { state } = useUserContext();
  return (
    <Route
      {...props}
      render={({ location }) => {
        debugger;
        return state.user ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        );
      }}
    ></Route>
  );
};
