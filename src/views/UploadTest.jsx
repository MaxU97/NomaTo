import React, { useState } from "react";
import api from "../api/config";
const UploadTest = () => {
  const [image, setImage] = useState();
  const uploaderHandler = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("file", e.target.files[0]);
    api
      .post("updateProfile", data)
      .then((res) => {
        console.log(res.data.image);
        setImage(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <input
        type="file"
        name="file"
        onChange={(event) => {
          uploaderHandler(event);
        }}
      ></input>
      <img src={image}></img>
    </div>
  );
};

export default UploadTest;
