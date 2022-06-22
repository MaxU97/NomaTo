import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useUserContext } from "../../context/user";
import NotFound from "../../views/NotFound";

export const PrivateRoute = ({ children, admin = false, ...props }) => {
	const { state } = useUserContext();
	return (
		<Route
			{...props}
			render={({ location }) => {
				return state.user ? (
					admin ? (
						state.user.admin ? (
							children
						) : (
							<NotFound />
						)
					) : (
						children
					)
				) : (
					<Redirect to={{ pathname: "/login", state: { from: location } }} />
				);
			}}
		></Route>
	);
};
