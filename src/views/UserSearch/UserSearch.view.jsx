import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./usersearch.scss";
import Input from "../../components/Input/Input.component";
import UserCard from "./UserCard";
import { SpinnerAnimationIcon } from "../../assets/Icons";
import { getUserList } from "../../api/admin";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
const UserSearch = () => {
  const { notification } = useNotificationHandler();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [step, setStep] = useState(0);
  const [userList, setUserList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    var getData;
    getData = setTimeout(() => {
      setStep(0);
    }, 200);
    return () => clearTimeout(getData);
  }, [searchTerm]);

  useEffect(() => {
    refreshSearchWindow(searchTerm, step);
  }, [step]);

  const refreshSearchWindow = async (searchTerm, step) => {
    debugger;
    try {
      const data = await getUserList({
        searchTerm: searchTerm,
        step: step,
      });
      setTotalItems(data.totalCount);
      setUserList(data.users);
    } catch (e) {
      notification([e], true);
    }
  };

  const scrollRef = useRef();
  const onScroll = (event) => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setStep(step + 12);
      }
    }
  };
  return (
    <div className="user-search">
      <div className="container-m">
        <div className="user-search-container">
          <h2>{t("user-search.title")}</h2>
          <Input
            placeholder={t("user-search.placeholder")}
            animatePlaceholder={false}
            value={searchTerm}
            setValue={setSearchTerm}
          ></Input>
          <div
            className="user-search-results"
            onScroll={onScroll}
            ref={scrollRef}
          >
            {userList.map((user, index) => (
              <UserCard user={user}></UserCard>
            ))}
            {userList.length < totalItems && (
              <div className="user-search-results-loading">
                <SpinnerAnimationIcon scale={0.5}></SpinnerAnimationIcon>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
