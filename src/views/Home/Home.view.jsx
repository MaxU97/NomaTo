import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./home.scss";
import image from "../../assets/Logo-1-big.png";
import Input from "../../components/Input/Input.component";
import Carousel from "../../components/Carousel/Carousel.component";
import NewsBlock from "../../components/NewsBlock/NewsBlock.component";
import { getPopularItems } from "../../services/item.service";
import { useItemContext } from "../../context/item";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";

const Home = () => {
  const { state: itemState } = useItemContext();
  const popularItems = itemState.popularItems;
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();
  const { notification } = useNotificationHandler();
  return (
    <>
      <div className="home">
        <div className="container">
          <div className="home-search">
            <div className="home-search-title">
              <h1>{t("home.search-title-p1")}&nbsp;</h1>
              <h1 className="accent">{t("home.search-title-p2")}&nbsp;</h1>
              <h1>{t("home.search-title-p3")}&nbsp;</h1>
            </div>
            <Input
              className="search-bar"
              value={searchTerm}
              placeholder={t("search.placeholder")}
              setValue={setSearchTerm}
              button={true}
              buttonText={t("search.button")}
              inputButton={() => {
                window.location.href = `/search/?term=${searchTerm}`;
              }}
            />
            <h2>{t("search.checkout")}</h2>
            <div className="home-search-carousel">
              <Carousel items={popularItems} infinite={true}></Carousel>
              <a className="home-search-view-more">{t("search.viewmore")}</a>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Home;
