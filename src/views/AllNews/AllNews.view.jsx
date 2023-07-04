import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Input from "../../components/Input/Input.component";
import "./allnews.scss";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
import { SpinnerAnimationIcon } from "../../assets/Icons";
import NewsCard from "./NewsCard";
import { getNewsList } from "../../api/admin";
const AllNews = () => {
  const { t } = useTranslation();
  const { notification } = useNotificationHandler();
  const [searchTerm, setSearchTerm] = useState("");
  const [step, setStep] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [newsList, setNewsList] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    var getData;
    getData = setTimeout(() => {
      setStep(0);
      if (searchTerm.length != 0) {
        setStep(step + 1);
      }
    }, 200);
    return () => clearTimeout(getData);
  }, [searchTerm]);

  useEffect(() => {
    refreshSearchWindow(searchTerm, step);
  }, [step]);

  const refreshSearchWindow = async (searchTerm, step) => {
    try {
      debugger;
      const data = await getNewsList({
        searchTerm: searchTerm,
        step: step,
      });
      setTotalItems(data.totalCount);
      setNewsList(data.news);
    } catch (e) {
      notification([e], true);
    }
  };

  const onScroll = (event) => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setStep(step + 6);
      }
    }
  };
  return (
    <div className="all-news">
      <div className="container-l">
        <div className="all-news-container">
          <h2>{t("all-news.title")}</h2>
          <Input
            placeholder={t("all-news.placeholder")}
            animatePlaceholder={false}
            value={searchTerm}
            setValue={setSearchTerm}
          ></Input>
          <div className="all-news-results" onScroll={onScroll} ref={scrollRef}>
            {newsList.map((news, index) => (
              <NewsCard news={news}></NewsCard>
            ))}
            {newsList.length < totalItems && (
              <div className="all-news-results-loading">
                <SpinnerAnimationIcon scale={0.5}></SpinnerAnimationIcon>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllNews;
