import classNames from "classnames";
import { Image } from "pure-react-carousel";
import React, { useState, useRef, useEffect } from "react";
import Input from "../../components/Input/Input.component";
import "./addnews.scss";
import { newsUpload } from "../../api/news.api";
export const AddNews = () => {
  const [title, setTitle] = useState("");
  const [shortText, setShortText] = useState("");
  const [news, setNews] = useState("");
  const [imageList, setImageList] = useState([]);
  const [mainImage, setMainImage] = useState(0);
  const ref = useRef();

  const displayImages = (e) => {
    e.preventDefault();

    var newImage;
    if (e.target.files) {
      newImage = e.target.files;
    } else {
      return;
    }
    setImageList((imageList) => [...imageList, ...newImage]);
  };

  useEffect(() => {
    console.log((ref.current.value = ""));
  }, [imageList]);

  const removeImage = (index) => {
    const array = [...imageList];
    array.splice(index, 1);
    setImageList(array);
  };

  const handleUpload = async () => {
    let data = new FormData();
    //append files

    for (let i = 0; i < imageList.length; i++) {
      data.append("files", imageList[i]);
    }

    data.append("titleEN", title);
    data.append("short_textEN", shortText);
    data.append("textEN", news);
    data.append("titleRU", title);
    data.append("short_textRU", shortText);
    data.append("textRU", news);
    data.append("titleLV", title);
    data.append("short_textLV", shortText);
    data.append("textLV", news);
    data.append("mainImageIndex", mainImage);
    const response = newsUpload(data);
    console.log(response);
  };

  return (
    <div className="container">
      <div className="input-container">
        <h1> Add News</h1>
        <Input
          value={title}
          setValue={setTitle}
          className="input-field"
          placeholder="Title"
        ></Input>
        <Input
          value={shortText}
          setValue={setShortText}
          className="input-field m"
          placeholder="Short-text"
          textarea={true}
        ></Input>
        <Input
          value={news}
          setValue={setNews}
          className="input-field l"
          placeholder="News"
          textarea={true}
        />
        <div className="news-attach">
          <p>Attach Pictures:</p>
          <input
            name="my_file[]"
            ref={ref}
            type="file"
            multiple
            onChange={(event) => {
              displayImages(event);
            }}
          ></input>
        </div>
        <div className="news-attachments">
          <p>Attached Pictures:</p>
          <div className="news-attached-pictures">
            {imageList.map((image, index) => {
              console.log(image);
              return (
                <div
                  className={classNames(`attached-image`, {
                    "attached-image-active": index == mainImage,
                  })}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    onClick={() => setMainImage(index)}
                  />
                  <a
                    onClick={() => {
                      removeImage(index);
                    }}
                  >
                    Remove
                  </a>
                </div>
              );
            })}
          </div>
          <a
            className="upload-news-button"
            onClick={() => {
              handleUpload();
            }}
          >
            Add
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddNews;
