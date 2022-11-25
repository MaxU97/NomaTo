import React, { useState } from "react";
import Modal from "../Modal/Modal.component";
import { useUtilityContext } from "../../context/utility";
import { useTranslation } from "react-i18next";
import { MoveIcon } from "../../assets/Icons";
import { apiUrl } from "../../api/config";
import "./catfiltermodal.scss";
import { getCurrentLanguage } from "../../services/language.service";
import Input from "../Input/Input.component";
import classNames from "classnames";
const CategoryFilterModal = ({
  modalOpen,
  toggleModal,
  style,
  title = "Categories",
  setCategory = () => {},
  setSubCategories = () => {},
}) => {
  const { state } = useUtilityContext();
  const categories = state.categories;
  const [searchTerm, setSearchTerm] = useState();

  const titleLanguage = `title${getCurrentLanguage().toUpperCase()}`;

  const { t } = useTranslation();
  const [selectedCat, setSelectedCat] = useState(false);
  const [selectedSubCats, setSelectedSubcats] = useState([]);

  const filterCategories = (category) => {
    var searchedCategory = true;
    var searchedSub = true;

    if (searchTerm) {
      //check if searched was category
      var array = [
        ...category.titleRU.toUpperCase().split(/[,!?. ]+/),
        ...category.titleLV.toUpperCase().split(/[,!?. ]+/),
        ...category.titleEN.toUpperCase().split(/[,!?. ]+/),
      ];
      searchedCategory = array.includes(searchTerm.toUpperCase());
      array = category.subcats.flatMap((subcat) => [
        ...subcat.titleRU.toUpperCase().split(/[,!?. ]+/),
        ...subcat.titleLV.toUpperCase().split(/[,!?. ]+/),
        ...subcat.titleEN.toUpperCase().split(/[,!?. ]+/),
      ]);

      searchedSub = array.includes(searchTerm.toUpperCase());
    }
    return { searchedCategory, searchedSub };
  };

  const filterSubCats = (subcat) => {
    if (searchTerm) {
      const array = [
        ...subcat.titleRU.toUpperCase().split(/[,!?. ]+/),
        ...subcat.titleLV.toUpperCase().split(/[,!?. ]+/),
        ...subcat.titleEN.toUpperCase().split(/[,!?. ]+/),
      ];
      return array.includes(searchTerm.toUpperCase());
    } else {
      return true;
    }
  };

  const changeSubCats = (sub) => {
    if (selectedSubCats.includes(sub._id)) {
      selectedSubCats.splice(selectedSubCats.indexOf(sub._id), 1);
      setSelectedSubcats([...selectedSubCats]);
    } else {
      setSelectedSubcats([...selectedSubCats, sub._id]);
    }
  };
  return (
    <Modal modalOpen={modalOpen} toggleModal={toggleModal} style={style}>
      <div className="cat-filter-modal">
        <h1>{title}</h1>
        {!!selectedCat ? (
          <div className="categories-sub">
            <a
              className="back-button"
              onClick={() => {
                setSearchTerm("");
                setSelectedSubcats([]);
                setSelectedCat(false);
              }}
            >
              <MoveIcon className="move-left-icon" />
            </a>
            <hr></hr>
            {selectedCat.subcats.map((sub, index) => {
              const render = filterSubCats(sub);
              if (render) {
                return (
                  <div key={`cat-${index}`}>
                    <div
                      className={classNames(
                        "categories-sub-cat",
                        selectedSubCats.includes(sub._id) && "selected"
                      )}
                      onClick={() => {
                        changeSubCats(sub);
                      }}
                    >
                      <img src={`${apiUrl + "/" + selectedCat.imageURL}`}></img>
                      <h4>{sub[titleLanguage]}</h4>
                    </div>
                    <hr></hr>
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <>
            <div className="categories">
              {categories &&
                categories.map((cat, index) => {
                  const render = filterCategories(cat);

                  if (render.searchedCategory || render.searchedSub) {
                    return (
                      <div
                        key={`cat-${index}`}
                        className="category"
                        onClick={() => {
                          setSelectedCat(cat);
                          if (cat.subcats.length == 0) {
                            setSelectedCat(false);
                            setCategory(cat);
                            setSubCategories("");
                            toggleModal(false);
                          }
                          if (render.searchedCategory) {
                            setSearchTerm("");
                          }
                        }}
                      >
                        <img src={`${apiUrl + "/" + cat.imageURL}`}></img>
                        <h3>{cat[titleLanguage]}</h3>
                      </div>
                    );
                  }
                })}
            </div>
          </>
        )}
        <div className="categories-search-wrapper">
          <Input
            placeholder={t("utility.categories.search-categories")}
            withoutError={true}
            setValue={setSearchTerm}
            value={searchTerm}
          ></Input>
        </div>
        {selectedCat && (
          <a
            className="cat-filter-modal-apply"
            onClick={() => {
              setCategory(selectedCat);
              setSubCategories(selectedSubCats);
              setSelectedSubcats([]);
              setSelectedCat(false);
              toggleModal(false);
            }}
          >
            {t("utility.categories.apply")}
          </a>
        )}
      </div>
    </Modal>
  );
};

export default CategoryFilterModal;
