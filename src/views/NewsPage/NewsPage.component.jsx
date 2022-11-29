import React, { useEffect, useState } from "react";
import {
  getNewsSpecific,
  newsDelete,
  toggleNewsVisibility,
} from "../../api/news.api";
import { useParams, Link } from "react-router-dom";
import "./newspage.scss";
import { formatDate } from "../../services/responsive.service";
import { apiUrl } from "../../api/config";
import { useUserContext } from "../../context/user";

import {
  EyeClosedIcon,
  EyeOpenIcon,
  PencilIcon,
  TrashIcon,
} from "../../assets/Icons";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
import classNames from "classnames";

const NewsPage = () => {
  const { id } = useParams();
  const { state: userState } = useUserContext();
  const [news, setNews] = useState();
  const { notification } = useNotificationHandler();
  useEffect(async () => {
    try {
      const news = await getNewsSpecific(id);
      setNews(news);
    } catch (err) {
      window.location.href = "/";
    }
  }, []);

  const removeNews = async () => {
    try {
      const message = await newsDelete(id);
      notification([message]);
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (err) {
      notification([err], true);
    }
  };

  const toggleVisibility = async () => {
    try {
      const message = await toggleNewsVisibility(id);
      notification([message]);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      notification([err], true);
    }
  };
  return (
    <div className="news-page">
      <div className="container-m no-padding-top">
        {news && (
          <div className="news-container">
            {userState.user.admin && (
              <div className="news-settings">
                <div className="news-settings-content">
                  <Link to={`/edit-news/${id}`}>
                    <PencilIcon></PencilIcon>
                  </Link>
                  {news.hidden ? (
                    <EyeClosedIcon onClick={toggleVisibility}></EyeClosedIcon>
                  ) : (
                    <EyeOpenIcon onClick={toggleVisibility}></EyeOpenIcon>
                  )}
                  <TrashIcon
                    className="trash"
                    onClick={() => {
                      removeNews();
                    }}
                  ></TrashIcon>
                </div>
              </div>
            )}
            <div className="news-title">{news.title}</div>
            <div className="news-image">
              <img src={apiUrl + "/NewsImages/" + news.image}></img>
            </div>
            <div className={classNames("news-text", news.template)}>
              {news.body}
            </div>
            <div className="news-date">
              {formatDate(new Date(news.dateAdded))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
