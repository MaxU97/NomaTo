import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import { CloseIcon, MoveIcon, PlusIcon } from "../../assets/Icons";
import Input from "../Input/Input.component";
import Places from "../Map/Places.component";
import CategoryFilter from "./CategoryFilter.component";
import LocationFilter from "./LocationFilter.component";
import "./mobilefilters.scss";
import PriceFilter from "./PriceFilter.component";
import SortFilter from "./SortFilter.component";
const MobileFilters = ({
  applySort = () => {},
  sortOptions,
  changeLatLng = () => {},
  setAddress = () => {},
  changeKm = () => {},
  km,
  applyLocation = () => {},
  address,
  addressApplied,
  applyPrice = () => {},
  getPriceString = () => {},
  priceFrom,
  setPriceFrom = () => {},
  priceTo,
  setPriceTo = () => {},
  applyCategory = () => {},
  applySubCategories = () => {},
  categoryValue,
  subCategoryValue,
}) => {
  const { t } = useTranslation();
  return (
    <div className="mobile-filter">
      <h2 className="filters-title">{t("search-page.filters")}</h2>
      <SortFilter applySort={applySort} sortOptions={sortOptions}></SortFilter>

      <LocationFilter
        changeLatLng={changeLatLng}
        setAddress={setAddress}
        changeKm={changeKm}
        km={km}
        applyLocation={applyLocation}
        address={address}
        addressApplied={addressApplied}
      ></LocationFilter>

      <CategoryFilter
        applyCategory={applyCategory}
        categoryValue={categoryValue}
        applySubCategories={applySubCategories}
        subCategoryValue={subCategoryValue}
      ></CategoryFilter>

      <PriceFilter
        applyPrice={applyPrice}
        getPriceString={getPriceString}
        priceFrom={priceFrom}
        priceTo={priceTo}
        setPriceFrom={setPriceFrom}
        setPriceTo={setPriceTo}
      ></PriceFilter>
    </div>
  );
};

export default MobileFilters;
