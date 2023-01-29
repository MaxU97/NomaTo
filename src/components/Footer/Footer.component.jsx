import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "../../assets/Icons";
import FooterRight from "../../assets/footer-right.png";
import FooterLeft from "../../assets/footer-left.png";
import "./footer.scss";
import { useUserContext } from "../../context/user";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { state: userState } = useUserContext();
  const location = useLocation();
  const [display, setDisplay] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    if (location.pathname === "/") {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  });

  return (
    <>
      {display && (
        <div className="footer">
          <div className="footer-bg">
            <div className="footer-content">
              <div className="footer-content-grid">
                {!userState.user && (
                  <Link to="/login">{t("footer.login")}</Link>
                )}
                <Link to="/search">{t("footer.browse")}</Link>
                <Link to="/guarantee">{t("footer.guarantee")}</Link>
                <Link to="/how-it-works">{t("footer.works")}</Link>
                <Link to="/privacy-policy">{t("footer.privace")}</Link>
                <Link to="/terms-of-service">{t("footer.tos")}</Link>
                <Link to="/faq">{t("footer.faq")}</Link>
              </div>
              <div className="footer-content-socials">
                <FacebookIcon></FacebookIcon>
                <TwitterIcon></TwitterIcon>
                <InstagramIcon></InstagramIcon>
              </div>
            </div>
          </div>
          <div className="footer-copyright">© Nomato.eu Limited 2022</div>
          <img className="footer-left" src={FooterLeft}></img>
          <img className="footer-right" src={FooterRight}></img>
        </div>
      )}
    </>
  );
};

export default Footer;
