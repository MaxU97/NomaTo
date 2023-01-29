import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory, Redirect, useLocation } from "react-router-dom";
import Input from "../../components/Input/Input.component";
import "./login.scss";
import { useUserContext } from "../../context/user";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
import ReCAPTCHA from "react-google-recaptcha";
import { captchaKey } from "../../api/config";
const Login = () => {
  const { state } = useUserContext();
  const reRef = useRef();
  const { t } = useTranslation();
  const { notification } = useNotificationHandler();
  const { AUTHORIZE } = useUserContext();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setEmail(email);
    setPassword(password);
  });

  const setCaptcha = (e) => {
    setCaptchaToken(e);
  };
  const submitForm = async () => {
    const err = await AUTHORIZE({
      email: email,
      password: password,
      token: captchaToken,
    });

    if (err) {
      notification([err.message], true);
      reRef.current?.reset();
      setCaptchaToken(false);
      setError(err.message);
    } else {
      if (location.state?.from) {
        <Redirect to={{ pathname: location.state?.from.pathname }}></Redirect>;
      } else {
        <Redirect to={{ pathname: "/" }}></Redirect>;
      }
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
            type="email"
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
          {state.loginAttempts > 2 && (
            <ReCAPTCHA
              sitekey={captchaKey}
              onChange={setCaptcha}
              size="normal"
              ref={reRef}
              style={{ marginBottom: "20px" }}
            />
          )}

          <a
            disabled={!!!captchaToken && state.loginAttempts > 2}
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
