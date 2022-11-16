import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./home.scss";
import image from "../../assets/Logo-1-big.png";
import Input from "../../components/Input/Input.component";
import Carousel from "../../components/Carousel/Carousel.component";
import NewsBlock from "../../components/NewsBlock/NewsBlock.component";
import { Link } from "react-router-dom";
import { getPopularItems } from "../../services/item.service";
import { useItemContext } from "../../context/item";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
import ItemGrid from "../../components/ItemGrid/ItemGrid.component";

const Home = () => {
  const [curSec, setCurSec] = useState(1);

  const { state: itemState } = useItemContext();
  const popularItems = itemState.popularItems;
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();
  const { notification } = useNotificationHandler();

  return (
    <div className="home">
      <section className="search-main">
        <div className="container">
          <div className="home-search">
            <div className="home-search-title">
              <h1>{t("home.search-title-p1")}&nbsp;</h1>
              <h1 className="accent">{t("home.search-title-p2")}&nbsp;</h1>
              <h1>{t("home.search-title-p3")}&nbsp;</h1>
            </div>
            <Input
              value={searchTerm}
              placeholder={t("search.placeholder")}
              setValue={setSearchTerm}
              button={true}
              buttonText={t("search.button")}
              withoutError={true}
              buttonAction={() => {
                window.location.href = `/search/?term=${searchTerm}`;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  window.location.href = `/search/?term=${searchTerm}`;
                }
              }}
            />

            <div className="home-search-carousel">
              <h2>{t("search.checkout")}</h2>
              <Carousel items={popularItems} infinite={true}></Carousel>
              <Link to="/search/" className="home-search-view-more">
                {t("search.viewmore")}
              </Link>
            </div>
            <div className="home-search-grid">
              <h2>{t("search.checkout")}</h2>
              <ItemGrid items={popularItems}></ItemGrid>
              <Link to="/search/" className="home-search-view-more">
                {t("search.viewmore")}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="news">
        <div className="container" style={{ maxWidth: "1200px" }}>
          <div className="home-news">
            <h1>{t("home.news.title")}</h1>
            <NewsBlock></NewsBlock>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
