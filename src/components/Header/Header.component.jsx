import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./header.scss";
import Logo from "../../assets/Logo-1.png";
import SmallLogo from "../../assets/SmallLogo.png";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../context/user";
import Input from "../Input/Input.component";

import useWindowDimensions from "../../services/responsive.service";
import Menu from "../Menu/Menu.component";

const Header = () => {
  const { isMobile } = useWindowDimensions();

  const { t } = useTranslation();

  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="header">
      <div className="header-content">
        <div className="logo-container">
          <Link to="/">
            {isMobile ? (
              <img className="small-logo" src={SmallLogo}></img>
            ) : (
              <img src={Logo}></img>
            )}
          </Link>
        </div>
        {location.pathname !== "/" &&
          location.pathname !== "/search/" &&
          !isMobile && (
            <div className="header-search">
              <Input
                value={searchTerm}
                placeholder={t("search.placeholder")}
                setValue={setSearchTerm}
                button={true}
                buttonText={t("search.button")}
                buttonAction={() => {
                  window.location.href = `/search/?term=${searchTerm}`;
                }}
                withoutError={true}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    window.location.href = `/search/?term=${searchTerm}`;
                  }
                }}
              />
            </div>
          )}
        <Menu></Menu>
      </div>
    </div>
  );
};

export default Header;
