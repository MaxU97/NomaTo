import React from "react";
import { apiUrl } from "../../api/config";

const UserCard = ({ user }) => {
  return (
    <a className="user-card" href={`user/${user._id}`}>
      <img src={apiUrl + "/" + user.profileImage}></img>
      <div className="user-card-details">
        <div className="user-card-name">{user.name}</div>
        <div className="user-card-email">{user.email}</div>
      </div>
    </a>
  );
};

export default UserCard;
