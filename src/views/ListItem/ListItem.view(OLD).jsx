import { t } from "i18next";
import React, { useEffect, useState } from "react";
import "./listitem.scss";
import Input from "../../components/Input/Input.component";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CategoryModal from "../../components/CategoryModal/CategoryModal.component";

const ListItem = () => {
  const [title, setTitle] = useState("");
  const [titleName, setTitleName] = useState("");
  const [titleModel, setTitleModel] = useState("");
  const [titleMake, setTitleMake] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categoryText, setCategoryText] = useState("");
  const [desc, setDesc] = useState("");
  const [address, setAddress] = useState("");
  const [rentPriceDay, setRentPriceDay] = useState("");
  const [rentPriceWeek, setRentPriceWeek] = useState("");
  const [rentPriceMonth, setRentPriceMonth] = useState("");
  const [itemValue, setItemValue] = useState("");
  const [minRent, setMinRent] = useState("");
  const [titleTouched, setTouched] = useState(false);
  const [categoryModal, toggleCategories] = useState(false);

  const [titleInputs, setTitleInputs] = useState([]);

  useEffect(() => {

    if (titleTouched) {
      return;
    } else {
      let titlename = "";

      Object.keys(titleInputs).map((key) => {
        if (titleInputs[key]) {
          titlename = titlename + " " + titleInputs[key];
        }
      });

      setTitle(titlename);
    }
  }, [titleInputs, titleTouched]);

  const checkEmpty = (event) => {
    if (!event.target.value) {
      setTouched(false);
    }
  };

  useEffect(() => {
    let timer1 = setTimeout(() => toggleCategories(true), 0);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  useEffect(() => {
    if (category) {
      let inputObjects = {};
      category.fields.forEach(({ name }) => {
        inputObjects[name] = "";
      });
      setTitleInputs(inputObjects);
    }
  }, [category]);

  useEffect(() => {
    setCategoryText(category.name + " >>> " + subCategory.name);
  }, [category, subCategory]);

  return (
    <div className="add-listing">
      {category && (
        <div className="container-m">
          <div className="listing-form">
            <h1>{t("list-item.title")}</h1>
            <div className="listing-form-multi listing-form-field">
              {Object.keys(titleInputs).map((key) => (
                <Input
                  placeholder={key}
                  className="price-short"
                  value={titleInputs[key]}
                  setValue={(val) =>
                    setTitleInputs({ ...titleInputs, [key]: val })
                  }
                />
              ))}
            </div>
            <Input
              placeholder={t("list-item.set-title")}
              className="listing-form-field"
              value={title}
              disabled = {true};
              setValue={setTitle}
              onFocus={() => {
                setTouched(true);
              }}
              onBlur={(event) => {
                checkEmpty(event);
              }}
            ></Input>
            <Input
              placeholder={t("list-item.category")}
              value={categoryText}
              style={{ cursor: "pointer" }}
              setValue={setCategoryText}
              className="listing-form-field"
              onFocus={(event) => {
                toggleCategories(true);
                event.target.blur();
              }}
            ></Input>
            <Input
              placeholder={t("list-item.desc")}
              value={desc}
              setValue={setDesc}
              className="listing-form-field"
            ></Input>
            <Input
              placeholder={t("list-item.address")}
              value={address}
              setValue={setAddress}
            ></Input>
            <div className="note listing-form-field">
              {t("list-item.address-disclaimer")}
            </div>
            <Input
              className="price-short listing-form-field"
              placeholder={t("list-item.item-value")}
              value={itemValue}
              setValue={setItemValue}
            ></Input>
            <Input
              className="price-short listing-form-field"
              placeholder={t("list-item.min-days")}
              value={minRent}
              setValue={setMinRent}
            ></Input>
            <h4>{t("list-item.price-per")}</h4>

            <div className="listing-form-multi">
              <Input
                className="price-short"
                placeholder={t("list-item.day")}
                value={rentPriceDay}
                setValue={setRentPriceDay}
              ></Input>
              <Input
                className="price-short"
                placeholder={t("list-item.week")}
                value={rentPriceWeek}
                setValue={setRentPriceWeek}
              ></Input>
              <Input
                className="price-short"
                placeholder={t("list-item.month")}
                value={rentPriceMonth}
                setValue={setRentPriceMonth}
              ></Input>
            </div>
            <div className="listing-form-buttons">
              <Link className="listing-button gray" to="/">
                {t("list-item.cancel")}
              </Link>
              <a className="listing-button" href="/">
                {t("list-item.list-item")}
              </a>
            </div>
          </div>
        </div>
      )}

      <CategoryModal
        modalOpen={categoryModal}
        toggleModal={toggleCategories}
        style={{ backgroundColor: "none" }}
        title="Select a category"
        setCategory={setCategory}
        setSubCategory={setSubCategory}
      />
      {!category && (
        <div className="no-cat">
          <a
            className="no-cat-button"
            onClick={() => {
              toggleCategories(true);
            }}
          >
            Choose a category
          </a>
        </div>
      )}
    </div>
  );
};

export default ListItem;
