import React from "react";
import { apiUrl } from "../../api/config";
import { formatDate } from "../../services/responsive.service";

const NewsCard = ({ news }) => {
  return (
    <a className="news-card" href={`news/${news._id}`}>
      <div className="news-card-image">
        {" "}
        <img src={apiUrl + "/NewsImages/" + news.image}></img>
      </div>

      <div className="news-card-details">
        <div className="news-card-title">{news.title}</div>
        <div className="news-card-date">
          {formatDate(new Date(news.dateAdded))}
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
