import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useParams } from "react-router-dom";
import Input from "../../components/Input/Input.component";
import "./login.scss";
import { useUserContext } from "../../context/user";
const Login = () => {
  const { t } = useTranslation();
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
        <Input
          placeholder="Email"
          value={email}
          setValue={setEmail}
          className="login-form-field"
        ></Input>
        <Input
          placeholder="Password"
          value={password}
          setValue={setPassword}
          type="password"
          className="login-form-field"
        ></Input>
        <div>
          {error && <div className="login-error">{error}</div>}
          {t("login.no-account")}{" "}
          <Link className="change-log-type" onClick={() => {}} to="/register">
            {t("login.click-here")}
          </Link>
        </div>

        <a
          className="login-button"
          onClick={() => {
            submitForm();
          }}
        >
          {t("login.login")}
        </a>
      </div>
    </div>
  );
};

export default Login;
