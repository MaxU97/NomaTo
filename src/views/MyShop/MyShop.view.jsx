import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getMyItems } from "../../api/item";
import "./myshop.scss";
const MyShop = () => {
  const { t } = useTranslation();
  const tabs = [t("my-shop.my-items"), t("my-bookings.approval-required")];
  const [activeTab, setActiveTab] = useState(0);
  const [items, setItems] = useState();
  useEffect(() => {
    const mountPage = async () => {
      debugger;
      try {
        const items = await getMyItems();
      } catch (err) {}
      setItems(items);
    };
    mountPage();
  }, []);
  return (
    <div className="myshop">
      <div className="container-l">
        <div className="myshop-content">
          <div className="menu-list">
            {tabs.map((cat, index) => (
              <div
                className={classNames(
                  "menu-list-item",
                  activeTab == index && "active"
                )}
                onClick={() => {
                  !(activeTab == index) && setActiveTab(index);
                }}
              >
                {cat}
              </div>
            ))}
          </div>
          <div className="myshop-content-container">
            {items &&
              items.map((item, index) => (
                <div className="myshop-content-container-item">
                  <img src={item.image}></img>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyShop;
