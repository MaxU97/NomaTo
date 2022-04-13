import React, { useState } from "react";
import api from "../api/config";
const UploadTest = () => {
  const [image, setImage] = useState();
  const uploaderHandler = (e) => {
    e.preventDefault();

    let data = new FormData();

    data.append("files", e.target.files);
    for (let i = 0; i < e.target.files.length; i++) {
      data.append("files", e.target.files[i]);
    }
    console.log("UPLOAD TEST FILE");

    console.log(e.target.files);
    api
      .post("news/upload", data)
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
        multiple
        onChange={(event) => {
          uploaderHandler(event);
        }}
      ></input>
      <img src={image}></img>
    </div>
  );
};

export default UploadTest;
