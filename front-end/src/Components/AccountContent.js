import React, { useEffect, useRef, useState, createContext } from "react";
import { profileSrc } from "./Data";
import ProfileModal from "./ProfileModal";
import axios from "axios";
import ChangePasswordModal from "./ChangePasswordModal";
import SetupTwoFactor from "./TwoFactor/SetupTwoFactor";

const getAverageColor = (imageElement, ratio) => {
  const canvas = document.createElement("canvas");

  let height = (canvas.height = imageElement.naturalHeight);
  let width = (canvas.width = imageElement.naturalWidth);

  const context = canvas.getContext("2d");
  context.drawImage(imageElement, 0, 0);

  let data, length;
  let i = -4,
    count = 0;

  try {
    data = context.getImageData(0, 0, width, height);
    length = data.data.length;
  } catch (err) {
    console.error(err);
    return {
      R: 0,
      G: 0,
      B: 0,
    };
  }
  let R, G, B;
  R = G = B = 0;
  while ((i += 4 * 4) < length) {
    ++count;
    R += data.data[i];
    G += data.data[i + 1];
    B += data.data[i + 2];
  }
  R = ~~(R / count);
  G = ~~(G / count);
  B = ~~(B / count);

  return {
    R,
    G,
    B,
  };
};
const AccountContent = () => {
  const [userPfp, setUserPfp] = useState(localStorage.getItem("profileImage"));
  const [userPic, setUserPic] = useState(userPfp);
  localStorage.getItem("profileImage");
  const username = {
    username: JSON.parse(localStorage.getItem("userLogin")).username,
  };
  useEffect(async () => {
    if (user.isLoggedIn) {
      try {
        const res = await axios.post(
          process.env.REACT_APP_BACK_END_URL + "/getProfile",
          username
        );
        localStorage.setItem("profileImage", res.data.profileImage);
        setUserPic(res.data.profileImage);
      } catch (err) {
        console.log(err.response.data);
      }
    }
  }, [userPfp]);
  const [pageColour, setPageColour] = useState({
    R: 0,
    G: 0,
    B: 0,
  });
  const profilePic = useRef(null);
  const user = JSON.parse(localStorage.getItem("userLogin"));
  const [profileModalFlag, setProfileModalFlag] = useState(false);
  const [passwordModalFlag, setPasswordModalFlag] = useState(false);
  const [twoFactorModal, setTwoFactorModal] = useState(false);
  return (
    <div>
      {profileModalFlag ? (
        <ProfileModal
          active={setProfileModalFlag}
          profilePic={userPfp}
          setPfp={setUserPfp}
        ></ProfileModal>
      ) : null}
      {passwordModalFlag ? (
        <ChangePasswordModal
          active={setPasswordModalFlag}
        ></ChangePasswordModal>
      ) : null}
      {twoFactorModal ? (
        <SetupTwoFactor
          active={setTwoFactorModal}
          username={user.username}
        ></SetupTwoFactor>
      ) : null}
      <section
        className="account-body"
        style={{
          background: `linear-gradient(180deg, rgba(${pageColour.R},${pageColour.G},${pageColour.B},1) 20%, rgba(0,0,0,0.5) 70%)`,
        }}
      >
        <div className="flex-container bottom-space">
          <div className="profile-container">
            <div className="acc-user-profile">
              <div>
                <img
                  className="unselectable"
                  src={userPfp}
                  alt={user.username}
                  ref={profilePic}
                  onLoad={() => {
                    setPageColour(getAverageColor(profilePic.current));
                  }}
                  crossOrigin="anonymous"
                />
              </div>
              <div
                className="acc-user-profile-lens"
                onClick={() => {
                  setProfileModalFlag(true);
                }}
              >
                <h3 className="nav-item unselectable white-text f-20">
                  <i className="fas fa-edit"></i> Edit
                </h3>
              </div>
            </div>
          </div>
          <div className="user-container">
            <span>
              <h3 className="header-card-sub f-20 white-text unselectable">
                Hello,
              </h3>
              <h1
                className="header-card-title f-64 white-text unselectable"
                onClick={() => {
                  setProfileModalFlag(true);
                }}
              >
                {user.isLoggedIn ? user.username : null}
              </h1>
            </span>
          </div>
        </div>
        <h1 className="content-header mb-2 f-26 unselectable left-margin-header">
          Password and Authentication
        </h1>
        <button
          className="pay-button unselectable mb-2 left-margin-header"
          onClick={() => {
            setPasswordModalFlag(true);
          }}
        >
          Change Password
        </button>
        <h1 className="content-header f-16 unselectable left-margin-header light-gray-text">
          Enable/Disable Two Factor Authentication
        </h1>
        <h3 className="content-header mb-2 f-10 unselectable left-margin-header light-gray-text">
          Protect your FitLink account with an extra layer of security. Once
          configured, you'll be required to enter both your password and an
          authentication code from your mobile phone in order to sign in.
        </h3>
        <button
          className="pay-button unselectable mb-2 left-margin-header"
          onClick={() => {
            setTwoFactorModal(true);
          }}
        >
          Enable Two-Factor Authentication
        </button>
      </section>
    </div>
  );
};

export default AccountContent;
