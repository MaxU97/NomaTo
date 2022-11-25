import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import { CloseIcon, MoveIcon } from "../../assets/Icons";
import Input from "../Input/Input.component";

const PriceFilter = ({
  applyPrice = () => {},
  getPriceString = () => {},
  priceFrom,
  setPriceFrom = () => {},
  priceTo,
  setPriceTo = () => {},
}) => {
  const { t } = useTranslation();
  const [priceOpen, togglePrice] = useState(false);
  return (
    <>
      {priceTo || priceFrom ? (
        <>
          <span className="mobile-filter-item active">
            {t("search-page.price")}
            <div className="mobile-filter-item-chosen">
              <span>{getPriceString()}</span>
              <CloseIcon
                onClick={() => {
                  applyPrice("", true);
                  setPriceFrom("");
                  setPriceTo("");
                }}
              ></CloseIcon>
            </div>
          </span>
        </>
      ) : (
        <span
          className="mobile-filter-item"
          onClick={() => {
            togglePrice(!priceOpen);
          }}
        >
          {t("search-page.price")}
        </span>
      )}
      <CSSTransition
        in={priceOpen}
        timeout={500}
        unmountOnExit
        classNames="sort-filter"
      >
        <div className="sort-filter-container no-gap h100">
          <div
            className="sort-filter-container-header"
            style={{ marginBottom: "20px" }}
          >
            <MoveIcon
              onClick={() => {
                togglePrice(false);
              }}
            ></MoveIcon>
            <h2>{t("search-page.price")}</h2>
          </div>
          <Input
            containerClass="price-modal-content-input"
            placeholder={t("search-page.price-from")}
            type="numer"
            value={priceFrom}
            setValue={setPriceFrom}
          ></Input>
          <Input
            containerClass="price-modal-content-input"
            placeholder={t("search-page.price-to")}
            type="numer"
            value={priceTo}
            setValue={setPriceTo}
          ></Input>
          <a
            className="location-modal-button"
            style={{ textAlign: "center" }}
            onClick={() => {
              applyPrice();
              togglePrice(false);
            }}
          >
            {t("search-page.apply")}
          </a>
        </div>
      </CSSTransition>
    </>
  );
};

export default PriceFilter;
