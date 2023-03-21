import React, { useState, useEffect, useContext, useRef } from "react";
import { profileSrc } from "./Data";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("userLogin"));

const UploadButton = ({ setImageFile, setFileName, profilePic }) => {
  const [uploadedImage, setUploadedImage] = useState(profilePic);
  const imageHandler = (e) => {
    const img = document.createElement("img");
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setUploadedImage(imageURL);
    return true;
  };
  const onFileUpload = async (e) => {
    const { files } = e.target;
    if (imageHandler(e)) {
      setFileName(files[0].name);
      setImageFile(files[0]);
    }
  };
  return (
    <>
      <label htmlFor="pic-inp" style={{ borderRadius: "50%" }}>
        <div className="acc-user-profile">
          <label htmlFor="pic-inp">
            <img
              style={{
                width: "100%",
                height: "auto",
              }}
              src={uploadedImage}
              alt={user.username}
              crossOrigin="anonymous"
              className="unselectable"
            />
          </label>

          <div className="acc-user-profile-lens">
            <h3 className="nav-item unselectable white-text f-16">
              <i className="fas fa-edit"></i> Choose a Photo
            </h3>
          </div>
        </div>
      </label>
      <input
        type="file"
        name="profilePic"
        onChange={(e) => {
          onFileUpload(e);
          // imageHandler(e);
        }}
        id="pic-inp"
        style={{ display: "none" }}
      />
    </>
  );
};
const ProfileModal = ({ active, profilePic, setPfp }) => {
  const modalBackground = useRef(null);
  const [blur, setBlur] = useState("none");
  const [fileName, setFileName] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [values, setValues] = useState({
    username: user.username,
    desc: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const onProfileSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImage", imageFile, fileName);
    formData.append("username", values.username);
    formData.append("desc", values.desc);
    formData.append("toFind", user.username);
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACK_END_URL + "/accUpdate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      localStorage.setItem("profileImage", res.data.profileImage);
      setPfp(localStorage.getItem("profileImage"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section
      ref={modalBackground}
      className="modal-background"
      onClick={(e) => {
        if (e.target.className === modalBackground.current.className) {
          active(false);
        }
      }}
    >
      <div className="modal-container">
        <div className="flex-container-sb">
          <h1 className="content-header unselectable f-26 text-shadow">
            Account Preferences
          </h1>
          <i
            className="fas fa-times white-text unselectable f-20 close-button"
            onClick={() => active(false)}
          ></i>
        </div>
        <form className="flex-container" style={{ padding: "10px" }}>
          <div className="inner-div-modal">
            <UploadButton
              setImageFile={setImageFile}
              setFileName={setFileName}
              profilePic={profilePic}
            ></UploadButton>
          </div>
          <div
            className="block-align"
            style={{
              margin: "1rem",
              padding: "5px",
              justifyContent: "space-around",
            }}
          >
            <input
              type="text"
              name="username"
              className="modal-text-input"
              value={values.username}
              onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="desc"
              className="content-header f-12 "
              style={{
                transform: "translateY(-27px) translateX(10px)",
                position: "absolute",
                transition: "0.1s ease-in",
                display: blur,
              }}
            >
              Description
            </label>
            <textarea
              onClick={() => setBlur("block")}
              onBlur={() => {
                setBlur("none");
              }}
              onFocus={() => {
                setBlur("block");
              }}
              className="modal-text-input"
              name="desc"
              id="desc"
              value={values.desc}
              onChange={(e) => handleChange(e)}
              placeholder="Enter Optional Description"
            ></textarea>
          </div>
          <button
            type="submit"
            className="pay-button unselectable save-button"
            onClick={(e) => {
              onProfileSave(e);
              active(false);
            }}
          >
            Save
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProfileModal;
