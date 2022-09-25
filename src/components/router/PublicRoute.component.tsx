import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/user";

const PublicRoute = ({ children, ...props }) => {
  const { state } = useUserContext();
  const location = useLocation();
  return (
    <Route
      {...props}
      render={() => {
        console.log(location);
        return !!state.token || !!localStorage.getItem("token") ? (
          location.state ? (
            <Redirect to={location.state.from.pathname} />
          ) : (
            <Redirect to="/" />
          )
        ) : (
          children
        );
      }}
    />
  );
};

export default PublicRoute;
