import React, { useState, useCallback } from "react";
import Modal from "../Modal/Modal.component";
import "./imageuploadmodal.scss";
import Cropper from "react-easy-crop";
import getCroppedImg from "./getCroppedImage";
import { CheckIcon, RotatingArrowIcon } from "../../assets/Icons";
import _ from "lodash";
import { useTranslation } from "react-i18next";

const ImageEditorModal = ({
  modalOpen = false,
  toggleModal = () => {},
  title = "Upload and Edit",
  uploadImages = [],
  setUploadImages = () => {},
  circleCrop = false,
}) => {
  const { t } = useTranslation();
  const [image, setImage] = useState();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const delayedImage = _.debounce((string) => setImage(string), 500);

  const onSelectImage = (e) => {
    e.preventDefault();
    var newImage;
    if (e.target.files) {
      newImage = URL.createObjectURL(e.target.files[0]);
    } else {
      return;
    }
    setImage(newImage);
  };

  const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const saveCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      setUploadImages([...uploadImages, croppedImage]);
      resetModal(false);
    } catch (e) {
      resetModal(false);
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const resetModal = (b) => {
    if (b) {
      toggleModal(b);
    } else {
      toggleModal(b);
      setCrop({ x: 0, y: 0 });
      setRotation(0);
      setZoom(1);
      setCroppedAreaPixels(null);
      delayedImage("");
    }
  };
  return (
    <Modal modalOpen={modalOpen} toggleModal={resetModal}>
      <div className="image-upload-modal">
        <h1>{title}</h1>

        {image ? (
          <div className="image-editor">
            <div className="image-editor-controls">
              <div
                className="image-editor-rotate image-editor-button"
                onClick={() => setRotation(rotation - 90)}
              >
                <RotatingArrowIcon />
              </div>
              <div
                className="image-editor-tick image-editor-button"
                onClick={() => {
                  saveCroppedImage();
                }}
              >
                <CheckIcon />
              </div>
            </div>
            <Cropper
              restrictPosition={true}
              maxZoom={10}
              zoomSpeed={0.2}
              showGrid={false}
              image={image}
              crop={crop}
              cropShape={circleCrop && "round"}
              rotation={rotation}
              zoom={zoom}
              aspect={circleCrop ? 1 / 1 : 1.5 / 1}
              onRotationChange={setRotation}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            ></Cropper>
          </div>
        ) : (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={onSelectImage}
              id="selectedFile"
              style={{ display: "none" }}
            />
            <div
              className="image-upload-modal-button"
              onClick={() => {
                document.getElementById("selectedFile").click();
              }}
            >
              {t("image-tools.upload")}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ImageEditorModal;
