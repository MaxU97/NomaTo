import classNames from "classnames";
import { set } from "lodash";
import { Slider } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { CloseIcon, MoveIcon, SpinnerAnimationIcon } from "../../assets/Icons";
import CategoryModal from "../../components/CategoryModal/CategoryModal.component";
import Input from "../../components/Input/Input.component";
import ItemThumbnail from "../../components/ItemThumbnail/ItemThumbnail.component";
import Map from "../../components/Map/Map.component";
import Places from "../../components/Map/Places.component";
import Modal from "../../components/Modal/Modal.component";
import SideMenu from "../../components/SideMenu/SideMenu.component";
import { useItemContext } from "../../context/item";
import { useUtilityContext } from "../../context/utility";
import { getNaturalAddress } from "../../services/item.service";
import { getCurrentLanguage } from "../../services/language.service";

import "./search.scss";
const SearchPage = () => {
  const options = { style: "currency", currency: "EUR" };
  const euroLocale = Intl.NumberFormat("lv-LV", options);
  const { t } = useTranslation();
  const language = getCurrentLanguage().toUpperCase();
  const [categoryModal, toggleCategories] = useState(false);
  const [locationModal, toggleLocations] = useState(false);
  const [priceModal, togglePriceModal] = useState(false);
  const [searchParams, setSearchParams] = useState();
  const [km, setKm] = useState(10);

  const [priceFrom, setPriceFrom] = useState();
  const [priceTo, setPriceTo] = useState();

  const [address, setAddress] = useState();
  const [addressApplied, setAddressApplied] = useState(false);
  const [latLng, setLatLng] = useState();
  // const [filterCategory, setFilterCategory] = useState(params.get("cat"));
  // const [filterPrice, setFilterPrice] = useState(params.get("price"));

  const [categoryValue, setCategoryValue] = useState();
  const [termValue, setTermValue] = useState();
  //  const [filterLocation, setLocation] = useState({
  //     lng: params.get("lng"),
  //     lat: params.get("lat"),
  //   });

  const [maxPages, setMaxPages] = useState();
  const [termChanged, setTermChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const { state: itemState, SEARCH_ITEMS } = useItemContext();

  const { state: utilityState } = useUtilityContext();

  useEffect(() => {
    const onLoad = async () => {
      search();
      const query = window.location.search;
      const params = new URLSearchParams(query);
      if (params.has("term")) {
        setTermValue(params.get("term"));
      }
      if (params.has("cat")) {
        utilityState.categories.every((cat) => {
          if (cat._id === params.get("cat")) {
            setCategoryValue(cat["title" + language]);
            return false;
          }
          return true;
        });
      }
      if (params.has("lat") && params.has("lng")) {
        var adr = await getNaturalAddress(params.get("lat"), params.get("lng"));
        setAddress([adr]);
        setLatLng({
          lat: parseFloat(params.get("lat")),
          lng: parseFloat(params.get("lng")),
        });
        setAddressApplied(true);
      }

      if (params.has("km")) {
        setKm(parseFloat(params.get("km")));
      }

      if (params.has("priceto")) {
        setPriceTo(params.get("priceto"));
      }
      if (params.has("pricefrom")) {
        setPriceFrom(params.get("pricefrom"));
      }
      parseParams(params);
    };
    onLoad();
  }, []);

  useEffect(() => {
    const query = window.location.search;
    const params = new URLSearchParams(query);
    if (params.has("cat")) {
      utilityState.categories.every((cat) => {
        if (cat._id === params.get("cat")) {
          setCategoryValue(cat["title" + language]);
          return false;
        }
        return true;
      });
    }
  }, [utilityState.categories]);

  const parseParams = (params) => {
    var newSearchParams = {};

    if (params.has("cat")) {
      newSearchParams.cat = params.get("cat");
    }
    if (params.has("term")) {
      newSearchParams.term = params.get("term");
    }
    if (params.has("lat")) {
      newSearchParams.lat = params.get("lat");
    }
    if (params.has("lng")) {
      newSearchParams.lng = params.get("lng");
    }
    if (params.has("pricefrom")) {
      newSearchParams.pricefrom = params.get("pricefrom");
    }
    if (params.has("priceto")) {
      newSearchParams.pricefrom = params.get("priceto");
    }
    if (params.has("km")) {
      newSearchParams.km = params.get("km");
    }

    setSearchParams(newSearchParams);
  };
  useEffect(() => {
    setMaxPages(Math.ceil(itemState.searchItemCount / 16));
  }, [itemState.searchItemCount]);

  const search = async () => {
    var terms = "";
    var category = "";
    var lat = "";
    var lng = "";
    var pricefrom = "";
    var priceto = "";
    const query = window.location.search;
    const params = new URLSearchParams(query);
    setIsLoading(true);

    if (params.has("term")) {
      terms = params.get("term");
    }
    if (params.has("cat")) {
      category = params.get("cat");
    }
    if (params.has("lat")) {
      lat = params.get("lat");
    }
    if (params.has("lng")) {
      lng = params.get("lng");
    }
    if (params.has("pricefrom")) {
      pricefrom = params.get("pricefrom");
    }
    if (params.has("priceto")) {
      priceto = params.get("priceto");
    }

    await SEARCH_ITEMS({
      terms: terms,
      category: category,
      lat: lat,
      lng: lng,
      km: km * 1000,
      page: page,
      pricefrom: pricefrom,
      priceto: priceto,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    search();
  }, [page]);

  useEffect(() => {
    if (searchParams) {
      var newURL = window.location.pathname;
      var count = 0;
      for (const [key, value] of Object.entries(searchParams)) {
        if (count > 0) {
          newURL = newURL + `&${key}=${value}`;
        } else {
          newURL = newURL + `?${key}=${value}`;
        }
        count += 1;
      }
      window.history.pushState({ path: newURL }, "", newURL);
      if (!termChanged) {
        search();
      }
    }
  }, [searchParams]);

  const changeStep = (value) => {
    setPage(page + value);
  };
  const setStep = (value) => {
    setPage(value);
  };

  const changeTerm = (value) => {
    setTermValue(value);
    setTermChanged(true);
  };

  useEffect(() => {
    var newSearchParams = searchParams;
    if (newSearchParams) {
      if (termValue) {
        newSearchParams["term"] = termValue;
      } else {
        delete newSearchParams["term"];
      }
      setSearchParams({ ...newSearchParams });
    }
  }, [termValue]);

  const changeCategory = async (value, event) => {
    setTermChanged(false);
    if (event) {
      event.stopPropagation();
    }
    var newSearchParams = searchParams;
    if (value) {
      newSearchParams["cat"] = value._id;
    } else {
      delete newSearchParams["cat"];
    }
    setCategoryValue(value["title" + language]);
    setSearchParams({ ...newSearchParams });
  };

  const changeKm = async (value, event) => {
    if (event) {
      event.stopPropagation();
    }
    setKm(value);
  };

  const changeLatLng = async (value, event) => {
    if (event) {
      event.stopPropagation();
    }
    setLatLng(value);
  };

  const applyPrice = (event, value = false) => {
    if (event) {
      event.stopPropagation();
    }
    setTermChanged(false);
    var newSearchParams = searchParams;
    if (priceFrom) {
      newSearchParams["pricefrom"] = priceFrom;
    } else {
      delete newSearchParams["pricefrom"];
    }
    if (priceTo) {
      newSearchParams["priceto"] = priceTo;
    } else {
      delete newSearchParams["priceto"];
    }
    if (value) {
      delete newSearchParams["pricefrom"];
      delete newSearchParams["priceto"];
    }
    setSearchParams({ ...newSearchParams });

    togglePriceModal(false);
  };

  const applyLocation = (event, value = false) => {
    if (event) {
      event.stopPropagation();
    }
    setTermChanged(false);
    setAddressApplied(true);
    var newSearchParams = searchParams;

    if (latLng) {
      newSearchParams["lat"] = latLng.lat;
      newSearchParams["lng"] = latLng.lng;
    } else {
      delete newSearchParams["lat"];
      delete newSearchParams["lng"];
      setAddressApplied(false);
    }
    if (km) {
      newSearchParams["km"] = km;
    } else {
      delete newSearchParams["km"];
    }
    if (value) {
      setAddressApplied(false);
      delete newSearchParams["lat"];
      delete newSearchParams["lng"];
      delete newSearchParams["km"];
    }
    setSearchParams({ ...newSearchParams });
    toggleLocations(false);
  };

  const createPages = () => {
    var elipsisAdded = false;
    var toReturn = [];
    for (let i = 0; i < maxPages; i++) {
      if (i == page - 1 || i == page || i == 0 || i + 1 == maxPages) {
        toReturn.push(
          <h3
            key={i}
            className={page == i && "active"}
            onClick={() => {
              setStep(i);
            }}
          >
            {i + 1}
          </h3>
        );
      } else if (i == page + 1) {
        elipsisAdded = false;
        toReturn.push(
          <h3
            key={i}
            className={page == i && "active"}
            onClick={() => {
              setStep(i);
            }}
          >
            {i + 1}
          </h3>
        );
      } else {
        var exists = false;
        if (elipsisAdded) {
          exists = toReturn.some((element) => {
            if (element.props.className == "disabled") {
              return true;
            } else {
              return false;
            }
          });
        }
        if (!exists && !elipsisAdded) {
          toReturn.push(
            <h3 key={i} className="disabled">
              ...
            </h3>
          );
          elipsisAdded = true;
        }
      }
    }
    return toReturn;
  };

  const getPriceString = () => {
    var stringToReturn;
    if (!priceFrom && !priceTo) {
      return t("search-page.price");
    }

    if (priceFrom) {
      stringToReturn = euroLocale.format(priceFrom);
    } else if (!priceFrom && priceTo) {
      stringToReturn = euroLocale.format(0);
    }

    if (priceTo) {
      stringToReturn = stringToReturn + "-" + euroLocale.format(priceTo);
    } else if (!priceTo && priceFrom) {
      stringToReturn = `${stringToReturn}+`;
    }
    return stringToReturn;
  };
  return (
    <>
      <div className="search">
        <div className="search-bar">
          <Input
            className="search-bar-input"
            value={termValue}
            setValue={changeTerm}
            button={true}
            buttonText="Search"
            withoutError
            buttonAction={() => {
              search();
            }}
          ></Input>
          <a
            className={classNames(
              "filter-item",
              address && addressApplied && "active"
            )}
            onClick={() => {
              toggleLocations(true);
            }}
          >
            {address && addressApplied
              ? address[0].long_name
              : t("search-page.location")}
            {addressApplied && address && (
              <CloseIcon
                className="filter-item-delete"
                onClick={async (event) => {
                  applyLocation(event, true);
                  setAddress("");
                }}
              ></CloseIcon>
            )}
          </a>
          <a
            className={classNames("filter-item", categoryValue && "active")}
            onClick={() => {
              toggleCategories(true);
            }}
          >
            {categoryValue ? categoryValue : t("search-page.category")}
            {categoryValue && (
              <CloseIcon
                className="filter-item-delete"
                onClick={async (event) => {
                  await changeCategory("", event);
                }}
              ></CloseIcon>
            )}
          </a>
          <a
            className={classNames(
              "filter-item",
              (priceTo || priceFrom) && "active"
            )}
            onClick={() => {
              togglePriceModal(true);
            }}
          >
            {getPriceString()}
            {(priceTo || priceFrom) && (
              <CloseIcon
                className="filter-item-delete"
                onClick={(event) => {
                  applyPrice(event, true);
                  setPriceFrom("");
                  setPriceTo("");
                }}
              ></CloseIcon>
            )}
          </a>
        </div>
        <div className="search-container">
          <div className="search-content">
            {isLoading ? (
              <div className="search-content-results loading">
                <SpinnerAnimationIcon scale={1}></SpinnerAnimationIcon>
              </div>
            ) : (
              <div className="search-content-results">
                <div className="search-content-results-grid">
                  {itemState.searchedItems.map((item, index) => (
                    <ItemThumbnail key={index} item={item}></ItemThumbnail>
                  ))}
                </div>
                <div className="search-content-counter">
                  <MoveIcon
                    className="arrow left"
                    onClick={() => {
                      changeStep(-1);
                    }}
                    disabled={page <= 0}
                  ></MoveIcon>
                  {createPages()}
                  <MoveIcon
                    className="arrow"
                    onClick={() => {
                      changeStep(1);
                    }}
                    disabled={page + 2 > maxPages}
                  ></MoveIcon>
                </div>
              </div>
            )}
          </div>
          <div className="search-map">
            <Map
              areaCenter={addressApplied ? latLng : ""}
              draggable={true}
              radius={addressApplied ? km : 1000}
              searchable={false}
              className="search-map-container"
              markersCoordinates={itemState.searchedItems}
              zoom={11}
            ></Map>
          </div>
        </div>

        <CategoryModal
          modalOpen={categoryModal}
          toggleModal={toggleCategories}
          style={{ backgroundColor: "none" }}
          title="Select a category"
          setCategory={async (event) => {
            await changeCategory(event);
          }}
          // setSubCategory={setSubCategory}
        />

        <Modal modalOpen={locationModal} toggleModal={toggleLocations}>
          <div className="location-modal">
            <h1>{t("search-page.location")}</h1>
            <div className="location-modal-content">
              <Places
                inMap={false}
                containerClass="location-modal-content-input"
                setPlace={changeLatLng}
                setAddress={setAddress}
              ></Places>
              <Input
                containerClass="location-modal-content-input"
                placeholder={t("search-page.distance")}
                type="numer"
                value={km}
                setValue={changeKm}
              ></Input>
            </div>
            <a className="location-modal-button" onClick={applyLocation}>
              {t("search-page.apply")}
            </a>
          </div>
        </Modal>

        <Modal
          modalOpen={priceModal}
          toggleModal={() => {
            applyPrice();
          }}
        >
          <div className="price-modal">
            <h1>{t("search-page.price")}</h1>
            <div className="price-modal-content">
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
            </div>
            <a className="price-modal-button" onClick={applyPrice}>
              {t("search-page.apply")}
            </a>
          </div>
        </Modal>

        {/* <SideMenu
          toggleMenu={togglePriceModal}
          menuOpen={priceModal}
        ></SideMenu> */}
      </div>
    </>
  );
};

export default SearchPage;
{
  /* <div className="location-modal-slider">
              <p>Select Range:</p>
              <Slider
                defaultValue={5}
                valueLabelDisplay="auto"
                step={5}
                marks
                min={5}
                max={50}
              ></Slider>
            </div> */
}
