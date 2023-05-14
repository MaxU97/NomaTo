import classNames from "classnames";
import React from "react";
import { apiUrl } from "../../api/config";
import { SpinnerAnimationIcon } from "../../assets/Icons";

const DetailsBlock = ({ details }) => {
  return (
    <div className="user-overview-field user-details">
      <h2>User Details</h2>

      {details ? (
        <>
          <img src={apiUrl + "/" + details.profileImage}></img>
          <table>
            <tr>
              <td colspan={2}></td>
            </tr>
            <tr>
              <td className="table-cat">Name:</td>
              <td>{details.name}</td>
            </tr>
            <tr>
              <td className="table-cat">Surname:</td>
              <td>{details.surname}</td>
            </tr>
            <tr>
              <td className="table-cat">Phone:</td>
              <td>{details.phone}</td>
            </tr>
            <tr>
              <td className="table-cat">Email:</td>
              <td>{details.email}</td>
            </tr>
            <tr>
              <td className="table-cat">Address: </td>
              <td>{details.address}</td>
            </tr>
            <tr>
              <td className="table-cat">Profile Completed: </td>
              <td>{details.completionStatus ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td className="table-cat">Last Active:</td>
              <td>{new Date(details.lastActive).toLocaleString("lv-Lv")}</td>
            </tr>
            <tr>
              <td className="table-cat">Languages:</td>
              <td>
                {details.languages.map((value, index) => {
                  return value + " ";
                })}
              </td>
            </tr>
            <tr>
              <td className="table-cat">Stripe Account ID: </td>
              <td>{details.stripeId ? details.stripeId : "Not linked"}</td>
            </tr>
            <tr>
              <td className="table-cat">Is Admin: </td>
              <td>{details.admin ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td className="table-cat">Warnings: </td>
              <td>{details.warnings ? details.warnings : 0}</td>
            </tr>
            <tr>
              <td className="table-cat">Suspended: </td>
              <td className={details.suspended && "suspended"}>
                {details.suspended ? "Yes" : "No"}
              </td>
            </tr>
          </table>
        </>
      ) : (
        <SpinnerAnimationIcon></SpinnerAnimationIcon>
      )}
    </div>
  );
};
export default DetailsBlock;
