import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import { CheckIcon, CloseIcon, QuestionIcon } from "../../assets/Icons";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../../context/user";
import Input from "../Input/Input.component";
import TextArea from "../TextArea/TextArea.component";
import validator from "validator";
import "./contactsupport.scss";
import { sendSupport } from "../../api/utility";
import { useNotificationHandler } from "../NotificationHandler/NotificationHandler.component";
const ContactSupport = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { notification } = useNotificationHandler();
  const [open, toggleOpen] = useState(false);
  const [question, toggleQuestion] = useState(true);
  const [formOpen, toggleFormOpen] = useState(false);

  const { state } = useUserContext();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState();
  const [subject, setSubject] = useState("");
  const [subjectError, setSubjectError] = useState();
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState();

  const [showToggle, toggleShowToggle] = useState(true);

  const [isSending, setIsSending] = useState(false);

  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      toggleShowToggle(false);
    } else {
      toggleShowToggle(true);
    }
  }, [location.pathname]);
  useEffect(() => {
    window.addEventListener("support_clicked", () => {
      toggleOpen(true);
    });
    window.addEventListener("mobile_menu_opened", () => {
      toggleShowToggle(false);
    });
    window.addEventListener("mobile_menu_closed", () => {
      toggleShowToggle(true);
    });

    return () => {
      window.removeEventListener("support_clicked", () => {
        toggleOpen(true);
      });
      window.removeEventListenerListener("mobile_menu_opened", () => {
        toggleShowToggle(false);
      });
      window.removeEventListener("mobile_menu_closed", () => {
        toggleShowToggle(true);
      });
    };
  }, []);

  const resetForm = () => {
    setEmail("");
    setSubject("");
    setMessage("");
    setSent(false);
  };
  useEffect(() => {
    if (state.user) {
      setEmail(state.user.email);
    }
  }, [state.user, open]);

  useEffect(() => {
    setEmailError("");
  }, [email]);
  useEffect(() => {
    setMessageError("");
  }, [message]);
  useEffect(() => {
    setSubjectError("");
  }, [subject]);

  const verifyFields = () => {
    var verified = true;

    const isEmail = validator.isEmail(email);
    if (!email || !isEmail) {
      setEmailError(t("support.valid-email"));
      verified = false;
    }

    if (!subject) {
      setSubjectError(t("support.valid-subject"));
      verified = false;
    }
    if (!message) {
      setMessageError(t("support.valid-message"));
      verified = false;
    }

    return verified;
  };

  const sendMail = async () => {
    const verified = verifyFields();
    if (verified) {
      setIsSending(true);
      try {
        await sendSupport({ email, subject, message });
        setSent(true);
        setTimeout(() => {
          toggleOpen(false);
          setTimeout(() => {
            resetForm();
          }, 500);
        }, 1000);
      } catch (err) {
        setIsSending(false);
      }
      setIsSending(false);
    }
  };
  return (
    <div className="support">
      <CSSTransition in={open} timeout={500} unmountOnExit classNames="form-in">
        <div className="support-form">
          <div className="support-form-top">
            <div className="support-form-top-title">
              <h2>{t("support.contact")}</h2>
              <p>{t("support.let-us-know")}</p>
            </div>

            <CloseIcon
              onClick={() => {
                toggleOpen(false);
              }}
            ></CloseIcon>
          </div>
          <div className="support-form-bottom">
            {!sent ? (
              <>
                <Input
                  placeholder={t("support.email")}
                  error={emailError}
                  errorText={emailError}
                  value={email}
                  setValue={setEmail}
                ></Input>
                <Input
                  placeholder={t("support.subject")}
                  error={subjectError}
                  errorText={subjectError}
                  value={subject}
                  setValue={setSubject}
                ></Input>
                <TextArea
                  placeholder={t("support.message")}
                  errorBool={messageError}
                  errorText={messageError}
                  value={message}
                  setValue={setMessage}
                  containerClassName="message-container"
                  withoutError={false}
                ></TextArea>
                <div
                  className="support-form-button"
                  onClick={() => {
                    sendMail();
                  }}
                  disabled={isSending}
                >
                  {t("support.send")}
                </div>
              </>
            ) : (
              <>
                <CheckIcon></CheckIcon>
                <h2>{t("support.sent")}</h2>
              </>
            )}
          </div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={showToggle}
        timeout={500}
        unmountOnExit
        classNames="toggle-in"
      >
        <div
          className="support-toggle"
          onClick={() => {
            toggleOpen(true);
          }}
        >
          <QuestionIcon></QuestionIcon>
        </div>
      </CSSTransition>
    </div>
  );
};

export default ContactSupport;
