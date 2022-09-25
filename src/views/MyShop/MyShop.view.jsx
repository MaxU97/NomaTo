import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiUrl } from "../../api/config";
import { deleteItem, getMyItems, toggleItemVisibility } from "../../api/item";
import {
  EyeClosedIcon,
  EyeOpenIcon,
  PencilIcon,
  TrashIcon,
} from "../../assets/Icons";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
import "./myshop.scss";
import { usePromptHandler } from "../../components/Prompt/Prompt.component";
const MyShop = () => {
  const { prompt } = usePromptHandler();
  const { t } = useTranslation();
  const { notification } = useNotificationHandler();
  const tabs = [t("my-shop.my-items"), t("my-shop.income")];
  const [activeTab, setActiveTab] = useState(0);
  const [items, setItems] = useState();
  const [reload, toggleReload] = useState(true);
  useEffect(() => {
    const mountPage = async () => {
      try {
        const items = await getMyItems();
        setItems(items);
      } catch (err) {
        notification([err]);
      }
    };
    mountPage();
  }, [reload]);

  const toggleVisibility = async (id) => {
    try {
      const message = await toggleItemVisibility({ id: id });
      toggleReload(!reload);
      notification([message]);
    } catch (err) {
      notification([err], true);
    }
  };

  const removeItem = async (id) => {
    try {
      const message = await deleteItem({ id: id });
      notification([message]);
      toggleReload(!reload);
      // setTimeout(() => {
      //   window.location.href = "/";
      // }, 1000);
    } catch (err) {
      notification([err], true);
    }
  };
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
          <div className="myshop-content-scroll">
            <div className="myshop-content-right">
              <div className="myshop-content-right-container">
                {items &&
                  activeTab == 0 &&
                  items.map((item, index) => (
                    <div className="my-item">
                      <img src={apiUrl + "/" + item.image}></img>
                      <div className="my-item-bottom">
                        <h3>{item.title}</h3>
                        <div className="my-item-tools">
                          <Link to={`/edit-item/${item.id}`}>
                            <PencilIcon></PencilIcon>
                          </Link>
                          {item.status == "hidden" ? (
                            <EyeClosedIcon
                              onClick={() => {
                                toggleVisibility(item.id);
                              }}
                            ></EyeClosedIcon>
                          ) : (
                            <EyeOpenIcon
                              onClick={() => {
                                toggleVisibility(item.id);
                              }}
                            ></EyeOpenIcon>
                          )}
                          <TrashIcon
                            className="trash"
                            onClick={() => {
                              prompt(
                                `Are you sure you want to delete "${item.title}"?`,
                                "This action is irrevirsible",
                                () => {
                                  removeItem(item.id);
                                }
                              );
                            }}
                          ></TrashIcon>
                        </div>
                      </div>
                    </div>
                  ))}
                {activeTab == 1}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyShop;
