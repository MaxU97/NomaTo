import classNames from "classnames";
import { set } from "lodash";
import React, { useState } from "react";
import ImagePicker from "../../components/ImagePicker/ImagePicker.component";
import Modal from "../Modal/Modal.component";
import ImageEditorModal from "./ImageEditorModal.component";
import "./multiimagepicker.scss";

const MultiImagePicker = ({
  amount = 5,
  className = "",
  imageList = [],
  toggleModal = () => {},
  setImages = () => {},
}) => {
  const populateImages = (amount) => {
    let returnDivs = [];
    for (let i = 0; i < amount; i++) {
      returnDivs.push(
        <ImagePicker
          buttonClassName="secondary-images-button"
          onClick={() => {
            toggleModal(true);
          }}
          image={imageList[i]}
          imageList={imageList}
          setImages={setImages}
          index={i}
          key={i}
        ></ImagePicker>
      );
    }
    return returnDivs;
  };

  return (
    <>
      <div className={classNames("multi-image-picker", className)}>
        <div className="secondary-images">{populateImages(amount)}</div>
      </div>
    </>
  );
};

export default MultiImagePicker;
