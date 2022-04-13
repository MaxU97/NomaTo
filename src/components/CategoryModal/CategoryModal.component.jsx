import React, { useState } from "react";
import Modal from "../Modal/Modal.component";
import categories from "../../services/categories.service";
import { useTranslation } from "react-i18next";
import { MoveIcon } from "../../assets/Icons";
import "./catmodal.scss";
const CategoryModal = ({
  modalOpen,
  toggleModal,
  style,
  title = "Categories",
  setCategory = () => {},
  setSubCategory = () => {},
}) => {
  const { t } = useTranslation();
  const [selectedCat, setSelectedCat] = useState(false);
  return (
    <Modal modalOpen={modalOpen} toggleModal={toggleModal} style={style}>
      <div className="cat-modal">
        <h1>{title}</h1>
        {!!selectedCat ? (
          <div className="categories-sub">
            <a
              className="back-button"
              onClick={() => {
                setSelectedCat(false);
              }}
            >
              <MoveIcon className="move-left-icon" />
            </a>
            <hr></hr>
            {selectedCat.subcat.map((sub) => (
              <>
                <div
                  className="categories-sub-cat"
                  onClick={() => {
                    setSelectedCat(false);
                    setCategory(selectedCat);
                    setSubCategory(sub);
                    toggleModal(false);
                  }}
                >
                  <img src={selectedCat.icon}></img>
                  <h4>{sub.name}</h4>
                </div>
                <hr></hr>
              </>
            ))}
          </div>
        ) : (
          <div className="categories">
            {categories.map((cat) => (
              <div
                className="category"
                onClick={() => {
                  setSelectedCat(cat);
                }}
              >
                <img src={cat.icon}></img>
                <h3>{cat.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CategoryModal;
