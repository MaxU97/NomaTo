import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import { CloseIcon, MoveIcon } from "../../assets/Icons";

const SortFilter = ({ sortOptions, applySort = () => {} }) => {
  const [sortOpen, toggleSort] = useState(false);
  const { t } = useTranslation();
  const [params, setParams] = useState(
    new URLSearchParams(window.location.search)
  );
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setParams(params);
  }, [window.location.search]);
  return (
    <>
      {params.has("sort_type") ? (
        sortOptions.map((value, index) => {
          if (value.value == params.get("sort_type")) {
            return (
              <>
                <span className="mobile-filter-item active">
                  {t("search-page.sort-by")}
                  <div className="mobile-filter-item-chosen">
                    {value.label}
                    <CloseIcon
                      onClick={() => {
                        applySort({ value: "" }, (value = true));
                      }}
                    ></CloseIcon>
                  </div>
                </span>
              </>
            );
          }
        })
      ) : (
        <span
          className="mobile-filter-item"
          onClick={() => {
            toggleSort(!sortOpen);
          }}
        >
          {t("search-page.sort-by")}
        </span>
      )}
      <CSSTransition
        in={sortOpen}
        timeout={500}
        unmountOnExit
        classNames="sort-filter"
      >
        <div className="sort-filter-container">
          <div className="sort-filter-container-header">
            <MoveIcon
              onClick={() => {
                toggleSort(false);
              }}
            ></MoveIcon>
            <h2>{t("search-page.sort-by")}</h2>
          </div>

          {sortOptions.map((value, index) => {
            return (
              <span
                className="mobile-filter-item-sub"
                onClick={() => {
                  applySort({ value: value.value });
                  toggleSort(false);
                }}
              >
                {value.label}
              </span>
            );
          })}
        </div>
      </CSSTransition>
    </>
  );
};

export default SortFilter;
