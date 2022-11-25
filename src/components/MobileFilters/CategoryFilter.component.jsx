import classNames from "classnames";
import _ from "lodash";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import { apiUrl } from "../../api/config";
import { CloseIcon, MoveIcon } from "../../assets/Icons";
import { useUtilityContext } from "../../context/utility";
import { getCurrentLanguage } from "../../services/language.service";
import Input from "../Input/Input.component";
import "./categoryfilter.scss";
const CategoryFilter = ({
  applyCategory = () => {},
  categoryValue,
  applySubCategories = () => {},
  subCategoryValue,
}) => {
  const { t } = useTranslation();
  const [categoryOpen, toggleCategory] = useState();
  const [searchTerm, setSearchTerm] = useState();

  const { state } = useUtilityContext();
  const categories = state.categories;

  const titleLanguage = `title${getCurrentLanguage().toUpperCase()}`;
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
    <>
      {categoryValue ? (
        <>
          <span className="mobile-filter-item active">
            {t("search-page.category")}
            <div className="mobile-filter-item-chosen">
              <span>
                {categoryValue}
                {subCategoryValue &&
                  subCategoryValue.length > 0 &&
                  ` (${subCategoryValue.length})`}
              </span>
              <CloseIcon
                onClick={() => {
                  applyCategory("");
                  applySubCategories([]);
                }}
              ></CloseIcon>
            </div>
          </span>
        </>
      ) : (
        <span
          className="mobile-filter-item"
          onClick={() => {
            toggleCategory(!categoryOpen);
          }}
        >
          {t("search-page.category")}
        </span>
      )}
      <CSSTransition
        in={categoryOpen}
        timeout={500}
        unmountOnExit
        classNames="sort-filter"
      >
        <>
          <div
            className="sort-filter-container no-gap h100"
            onTouchMove={(event) => {
              event.stopPropagation();
            }}
            onTouchEnd={(event) => {
              event.stopPropagation();
            }}
          >
            <div
              className="sort-filter-container-header"
              style={{ marginBottom: "20px" }}
            >
              <MoveIcon
                onClick={() => {
                  toggleCategory(false);
                  setTimeout(() => {
                    setSearchTerm("");
                    setSelectedSubcats([]);
                    setSelectedCat(false);
                  }, 500);
                }}
              ></MoveIcon>
              <h2>{t("search-page.category")}</h2>
            </div>
            <Input
              placeholder={t("utility.categories.search-categories")}
              withoutError={true}
              setValue={setSearchTerm}
              value={searchTerm}
            ></Input>
            <div className="category-filter-container">
              {!!selectedCat ? (
                <>
                  <div className="category-filter-sub">
                    {selectedCat.subcats.map((sub, index) => {
                      const render = filterSubCats(sub);
                      if (render) {
                        return (
                          <div
                            key={`cat-${index}`}
                            className={classNames(
                              "category-filter-sub-cat",
                              selectedSubCats.includes(sub._id) && "selected"
                            )}
                            onClick={() => {
                              changeSubCats(sub);
                            }}
                          >
                            <img
                              src={`${apiUrl + "/" + selectedCat.imageURL}`}
                            ></img>
                            <h4>{sub[titleLanguage]}</h4>
                          </div>
                        );
                      }
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div className="category-filter-categories">
                    {categories &&
                      categories.map((cat, index) => {
                        const render = filterCategories(cat);

                        if (render.searchedCategory || render.searchedSub) {
                          return (
                            <div
                              key={`cat-${index}`}
                              className="category-filter-categories-category"
                              onClick={() => {
                                setSelectedCat(cat);
                                if (cat.subcats.length == 0) {
                                  setSelectedCat(false);
                                  applyCategory(cat);
                                  applySubCategories("");
                                  toggleCategory(false);
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
            </div>
            {selectedCat && (
              <a
                className="category-filter-apply"
                onClick={() => {
                  applyCategory(selectedCat);
                  applySubCategories(selectedSubCats);
                  setSelectedSubcats([]);
                  setSelectedCat(false);
                  toggleCategory(false);
                }}
              >
                {t("utility.categories.apply")}
              </a>
            )}
          </div>
        </>
      </CSSTransition>
    </>
  );
};

export default CategoryFilter;
