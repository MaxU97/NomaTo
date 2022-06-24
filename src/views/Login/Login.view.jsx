import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useParams } from "react-router-dom";
import Input from "../../components/Input/Input.component";
import "./login.scss";
import { useUserContext } from "../../context/user";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
const Login = () => {
	const { t } = useTranslation();
	const { notification } = useNotificationHandler();
	const { AUTHORIZE } = useUserContext();
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	useEffect(() => {
		setEmail(email);
		setPassword(password);
	});
	const submitForm = async () => {
		const err = await AUTHORIZE({
			email: email,
			password: password,
		});
		if (err) {
			notification([err.message], true);

			setError(err.message);
		} else {
			history.goBack();
		}
	};

	return (
		<div className="login-page">
			<div className="container container-s login-container">
				<h1>
					{t("login.message-1")} <a>{t("login.message-2")}</a>
				</h1>
				<Input placeholder="Email" value={email} setValue={setEmail}></Input>
				<Input
					placeholder="Password"
					value={password}
					setValue={setPassword}
					type="password"
				></Input>
				<a
					className="login-page-button"
					onClick={() => {
						submitForm();
					}}
				>
					{t("login.login")}
				</a>
				<div className="login-page-actions">
					<Link className="change-log-type" to="/forgot-password">
						{t("login.forgot-password")}
					</Link>
					<Link className="change-log-type" to="/register">
						{t("login.register")}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
