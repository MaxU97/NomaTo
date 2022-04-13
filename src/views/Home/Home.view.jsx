import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./home.scss";
import image from "../../assets/Logo-1-big.png";
import Input from "../../components/Input/Input.component";
import Carousel from "../../components/Carousel/Carousel.component";
import NewsBlock from "../../components/NewsBlock/NewsBlock.component";
import { getPopularItems } from "../../services/item.service";

const Home = () => {
  const popularItems = getPopularItems();

  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  return (
    <>
      <div className="home">
        <div className="container">
          <div className="home-search">
            <img src={image} />
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
