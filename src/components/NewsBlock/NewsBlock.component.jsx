import React, { useEffect, useState } from "react";
import { getNews } from "../../api/news.api";
import "./newsblock.scss";
import { useTranslation } from "react-i18next";
import placeholderImage from "../../assets/ItemPictures/Bike.jpg";
import "react-loading-skeleton/dist/skeleton.css";
import { apiUrl, websitUrl } from "../../api/config";
import useWindowDimensions, {
  formatDate,
} from "../../services/responsive.service";
import NewsBlockSkeleton from "../../skeletons/NewsBlockSkeleton/NewsBlockSkeleton.component";
const NewsBlock = ({}) => {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);

  useEffect(async () => {
    const data = await getNews(3);
    setNews(data);
  }, []);
  return news.length ? (
    <div className="news-block">
      {news.map((n) => (
        <a className="news-item" href={websitUrl + "/news/" + n._id}>
          <div className="news-item-image">
            <img src={apiUrl + "/NewsImages/" + n.image}></img>
          </div>
          <div className="news-item-title">{n.title}</div>
          <div className="news-item-text">{n.body}</div>
          <div className="news-item-date">
            {formatDate(new Date(n.dateAdded))}
          </div>
        </a>
      ))}
    </div>
  ) : (
    <NewsBlockSkeleton></NewsBlockSkeleton>
  );
};

export default NewsBlock;
