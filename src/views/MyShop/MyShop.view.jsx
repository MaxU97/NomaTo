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
import CarouselSkeletonItem from "../../skeletons/CarouselSkeleton/CarouselSkeletonItem.component";
import MyShopSkeleton from "../../skeletons/MyShopSkeleton/MyShopSkeleton.component";
const MyShop = () => {
  const { prompt } = usePromptHandler();
  const { t } = useTranslation();
  const { notification } = useNotificationHandler();
  const tabs = [t("my-shop.all"), t("my-shop.hidden")];
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
          {/* <h1>{t("my-shop.my-items")}</h1> */}
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
                {items ? (
                  items.map((item, index) => {
                    if (activeTab == 1 && item.status !== "hidden") {
                      return;
                    }
                    return (
                      <div className="my-item">
                        <img src={apiUrl + "/" + item.image}></img>
                        <div className="my-item-bottom">
                          <h3>
                            <a href={`item/${item.id}`}>{item.title}</a>
                          </h3>
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
                                  t("my-shop.delete-prompt", {
                                    item_title: item.title,
                                  }),
                                  t("utility.prompt.irreversible"),
                                  () => {
                                    removeItem(item.id);
                                  }
                                );
                              }}
                            ></TrashIcon>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <>
                    {[
                      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                    ].map(() => {
                      return <MyShopSkeleton></MyShopSkeleton>;
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyShop;
