import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../api/config";
import { MoveIcon } from "../../assets/Icons";
import "./imagegallery.scss";
const ImageGallery = ({ className, images }) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setMainImage(images[current]);
  }, [current]);

  const nextImage = () => {
    let nextImage;
    if (current + 1 == images.length) {
      nextImage = 0;
    } else {
      nextImage = current + 1;
    }
    setCurrent(nextImage);
  };
  const previousImage = () => {
    let prevImage;
    if (current - 1 < 0) {
      prevImage = images.length;
    } else {
      prevImage = current - 1;
    }
    setCurrent(nextImage);
  };

  return (
    <div className={classNames("image-gallery", className)}>
      <div className="image-gallery-main">
        <MoveIcon
          className="next"
          onClick={() => {
            nextImage();
          }}
        ></MoveIcon>
        <MoveIcon
          className="previous"
          onClick={() => {
            previousImage();
          }}
        ></MoveIcon>
        <img src={apiUrl + "/" + mainImage}></img>
      </div>
      <div className="image-gallery-scroller">
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className={classNames(
                "image-gallery-scroller-item",
                current == index && "selected"
              )}
              onClick={() => {
                setCurrent(index);
              }}
            >
              <img src={apiUrl + "/" + image}></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
