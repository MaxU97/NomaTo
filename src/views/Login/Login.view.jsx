import React, { useEffect, useState, useRef } from "react";
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
  const passRef = useRef();

  return (
    <div className="login-page">
      <div className="container container-s login-container">
        <div className="login-page-wrapper">
          <h1>
            {t("login.message-1")} <a>{t("login.message-2")}</a>
          </h1>
          <Input
            placeholder={t("login.email")}
            value={email}
            setValue={setEmail}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                passRef?.current.focus();
              }
            }}
          ></Input>
          <Input
            placeholder={t("login.password")}
            value={password}
            setValue={setPassword}
            type="password"
            inputRef={passRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitForm();
              }
            }}
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
    </div>
  );
};

export default Login;
