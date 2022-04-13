import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "../../components/Input/Input.component";
import "./login.scss";
import { useUserContext } from "../../context/user";
import { login } from "../../api/auth";

const Login = () => {
  const { t } = useTranslation();
  const { AUTHORIZE, SIGNUP } = useUserContext();
  const [error, setError] = useState("");
  const [isLogin, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");

  useEffect(() => {
    setEmail(email);
    setPassword(password);
  });

  const submitForm = async () => {
    if (isLogin) {
      const err = await AUTHORIZE({
        email: email,
        password: password,
      });
      if (err) {
        setError(err.message);
      } else {
      }
    } else {
      const err = await SIGNUP({
        email: email,
        name: name,
        surname: surname,
        password: password,
      });
    }
  };

  const togglePage = () => {
    setError("");
    setLogin(!isLogin);
  };
  return (
    <div className="login-page">
      <div className="container container-s login-container">
        {isLogin ? (
          <>
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
              <a
                className="change-log-type"
                onClick={() => {
                  togglePage();
                }}
              >
                {t("login.click-here")}
              </a>
            </div>
          </>
        ) : (
          <>
            <h1>
              {t("login.reg-message-1")} <a>{t("login.reg-message-2")}</a>
            </h1>
            <Input
              placeholder="Name"
              value={name}
              setValue={setName}
              className="login-form-field"
            ></Input>
            <Input
              placeholder="Surname"
              value={surname}
              setValue={setSurname}
              className="login-form-field"
            ></Input>
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
            <Input
              placeholder="Confirm Password"
              value={confirmPW}
              setValue={setConfirmPW}
              type="password"
              className="login-form-field"
            ></Input>
            <div>
              {t("login.have-account")}{" "}
              <a
                className="change-log-type"
                onClick={() => {
                  togglePage();
                }}
              >
                {t("login.click-here")}
              </a>
            </div>
          </>
        )}

        <a
          className="login-button"
          onClick={() => {
            submitForm();
          }}
        >
          {isLogin ? t("login.login") : t("login.signup")}
        </a>
      </div>
    </div>
  );
};

export default Login;
