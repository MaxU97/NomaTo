import React, { useEffect, useState } from "react";
import { getNews } from "../../api/news.api";
import "./newsblock.scss";
import { useTranslation } from "react-i18next";
import { apiUrl } from "../../api/config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const NewsBlock = ({ display }) => {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);

  useEffect(async () => {
    const data = await getNews(display);
    // let mapped_data = data.data.body.map((item, i) => {
    //   if (item.newsID === data.data.images[i].newsID) {
    //     return Object.assign({}, item, data.data.images[i]);
    //   }
    // });

    let join1 = [];

    for (let i = 0; i < data.data.body.length; i++) {
      join1.push({
        ...data.data.body[i],
        ...data.data.images.find(
          (itm) => itm.newsID === data.data.body[i].newsID
        ),
      });
    }

    let mapped_data = [];
    for (let i = 0; i < data.data.doc.length; i++) {
      mapped_data.push({
        ...data.data.doc[i],
        ...join1.find((itm) => itm.newsID === data.data.doc[i]._id),
      });
    }

    // mapped_data = data.data.doc.map((item, i) => {
    //   if (item._id === mapped_data.newsID) {
    //     return Object.assign({}, item, mapped_data[i]);
    //   }
    // });

    setNews(mapped_data);
  }, []);
  return (
    <div className="news-block">
      <h1>{t("home.news.title")}</h1>
      <div className="news-gallery">
        <div className="news-gallery-main">
          {news.length > 0 && (
            <>
              <img src={`${apiUrl + "/" + news[0].imageURL}`} />
              <div className="news-gallery-main-text">
                <h2>{news[0].title}</h2>
                <p>{news[0].short_text}</p>
              </div>
            </>
          )}
        </div>
        <div className="news-gallery-list">
          {news.length > 0 &&
            news.map((item) => (
              <div
                className="news-gallery-list-item"
                style={{
                  backgroundImage: `url(${apiUrl + "/" + item.imageURL})`,
                }}
              >
                <div className="news-gallery-list-item-text">
                  <h4>{item.title}</h4>
                  <div className="p">{item.short_text}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NewsBlock;
