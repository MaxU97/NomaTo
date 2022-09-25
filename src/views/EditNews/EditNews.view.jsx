import classNames from "classnames";
import { Image } from "pure-react-carousel";
import React, { useState, useRef, useEffect } from "react";
import Input from "../../components/Input/Input.component";
import "./editnews.scss";
import { getNewsSpecific, newsUpdate, newsUpload } from "../../api/news.api";
import LanguagePicker from "../../components/Picker/LanguagePicker";
import { getLanguageArray } from "../../services/language.service";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TextArea from "../../components/TextArea/TextArea.component";
import ImagePicker from "../../components/ImagePicker/ImagePicker.component";
import ImageEditorModal from "../../components/ImagePicker/ImageEditorModal.component";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
import { formatDate } from "../../services/responsive.service";
import { apiUrl } from "../../api/config";

const EditNews = () => {
  const { id } = useParams();
  const { notification } = useNotificationHandler();

  const [title, setTitle] = useState("");
  const { t } = useTranslation();
  const [imgModal, toggleImgModal] = useState(false);

  const languages = getLanguageArray();
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [news, setNews] = useState("");
  const [imageList, setImageList] = useState([]);

  const [imageChanged, setImageChanged] = useState(false);
  useEffect(async () => {
    try {
      const news = await getNewsSpecific(id);

      setImageList([apiUrl + "/NewsImages/" + news.image]);
      setTitle(news.title);
      setSelectedLanguage([news.language]);
      setNews(news.body);
    } catch (err) {
      window.location.href = "/";
    }
  }, []);

  const setImage = (event) => {
    setImageList(event);
    setImageChanged(true);
  };

  const handleLanguageSelect = (event, language) => {
    setSelectedLanguage([language]);
  };

  const handleLanguageDelete = (event, language) => {
    event.stopPropagation();
    setSelectedLanguage(selectedLanguage.filter((lng) => lng != language));
  };

  const handleUpload = async () => {
    let data = new FormData();

    var promises = [];
    promises.push(fetch(imageList[0]).then((r) => r.blob()));
    //append files
    Promise.all(promises).then(async (result) => {
      if (imageChanged) {
        data.append("files", result[0]);
      }
      data.append("id", id);
      data.append("title", title);
      data.append("text", news);
      data.append("language", selectedLanguage[0]);

      try {
        var response = await newsUpdate(data);
        notification([response.message]);
        setTimeout(() => {
          window.location.href = `/news/${id}`;
        }, 1000);
      } catch (err) {
        notification([err.message], true);
      }
    });
  };

  return (
    <>
      <div className="container add-news">
        <div className="input-container">
          <h1> {t("add-news.add-news")}</h1>
          <ImagePicker
            buttonClassName="add-news-add-image"
            image={imageList.length && imageList[0]}
            imageList={imageList}
            setImages={setImage}
            onClick={toggleImgModal}
            showLegend={false}
          ></ImagePicker>
          <LanguagePicker
            languages={languages}
            placeholder={t("add-news.language")}
            selectedValues={selectedLanguage}
            onDelete={handleLanguageDelete}
            onSelect={handleLanguageSelect}
          />
          <Input
            value={title}
            setValue={setTitle}
            className="input-field"
            placeholder="Title"
          ></Input>
          <TextArea
            value={news}
            setValue={setNews}
            className="input-field"
            placeholder="News"
            textarea={true}
            maxCharacters={999999}
          />

          <a
            className="upload-news-button"
            onClick={() => {
              handleUpload();
            }}
          >
            {t("add-news.publish")}
          </a>
        </div>
      </div>

      <div className="container add-news-preview">
        <div className="input-container">
          <h1>{t("add-news.preview")}</h1>
          <div className="container-m" style={{ width: "800px" }}>
            <div className="news-container">
              <div className="news-title">
                {title ? title : t("add-news.title")}
              </div>
              <div className="news-image">
                <img alt="image" src={imageList[0]}></img>
              </div>
              <div className="news-text">
                {news ? news : t("add-news.news")}
              </div>
              <div className="news-date">
                {formatDate(new Date(Date.now()))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageEditorModal
        modalOpen={imgModal}
        toggleModal={toggleImgModal}
        setUploadImages={setImageList}
        uploadImages={imageList}
      ></ImageEditorModal>
    </>
  );
};

export default EditNews;
