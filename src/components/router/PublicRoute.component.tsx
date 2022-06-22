import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useUserContext } from "../../context/user";

const PublicRoute = ({ children, ...props }) => {
	const { state } = useUserContext();

	return (
		<Route
			{...props}
			render={() => {
				return !!state.token || !!localStorage.getItem("token") ? (
					<Redirect to="/" />
				) : (
					children
				);
			}}
		/>
	);
};

export default PublicRoute;
