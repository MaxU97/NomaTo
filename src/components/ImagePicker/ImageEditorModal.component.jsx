import React, { useState, useCallback } from "react";
import Modal from "../Modal/Modal.component";
import "./imageuploadmodal.scss";
import Cropper from "react-easy-crop";
import getCroppedImg from "./getCroppedImage";
import { CheckIcon, RotatingArrowIcon } from "../../assets/Icons";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import useWindowDimensions from "../../services/responsive.service";
import { useNotificationHandler } from "../NotificationHandler/NotificationHandler.component";

const ImageEditorModal = ({
  modalOpen = false,
  toggleModal = () => {},
  title = "Upload and Edit",
  uploadImages = [],
  setUploadImages = () => {},
  circleCrop = false,
}) => {
  const { isMobile } = useWindowDimensions();
  const { notification } = useNotificationHandler();
  const { t } = useTranslation();
  const [image, setImage] = useState();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const delayedImage = _.debounce((string) => setImage(string), 500);

  const imgRegEx = /image\/(jpe?g|png)/;
  const onSelectImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e) {
      if (e.type === "drop") {
        if (e.dataTransfer.files.length > 1) {
          notification([t("image-tools.only-one-image")], true, 100);
          return;
        }
        var newImage;
        if (e.dataTransfer.files) {
          if (imgRegEx.test(e.dataTransfer.files[0].type)) {
            newImage = URL.createObjectURL(e.dataTransfer.files[0]);
          } else {
            notification([t("image-tools.image-format")], true, 100);
          }
        } else {
          return;
        }
        setImage(newImage);
      } else {
        var newImage;
        if (e.target.files) {
          newImage = URL.createObjectURL(e.target.files[0]);
        } else {
          return;
        }
        setImage(newImage);
      }
    }
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
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={onSelectImage}
            >
              {!isMobile && (
                <svg className="drop-area" viewBox="0 0 100 100">
                  <path
                    fill="none"
                    d="M13,0 L0,0 L0,13"
                    stroke="#bebebe"
                    stroke-width="5"
                  ></path>
                  <path
                    fill="none"
                    d="M0,87 L0,100 L13,100"
                    stroke="#bebebe"
                    stroke-width="5"
                  ></path>
                  <path
                    fill="none"
                    d="M87,100 L100,100 L100,87"
                    stroke="#bebebe"
                    stroke-width="5"
                  ></path>
                  <path
                    fill="none"
                    d="M100,13 L100,0 87,0"
                    stroke="#bebebe"
                    stroke-width="5"
                  ></path>
                </svg>
              )}

              {isMobile
                ? t("image-tools.upload")
                : t("image-tools.drag-upload")}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ImageEditorModal;
