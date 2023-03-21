import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

const UserProfile = () => {
  const profileSrc = { src: localStorage.getItem("profileImage") };
  const user = JSON.parse(localStorage.getItem("userLogin"));
  const history = useHistory();
  const userLogin = { isLoggedIn: false };
  const [logout, setLogout] = useState({ display: "none" });
  const username = {
    username: JSON.parse(localStorage.getItem("userLogin")).username,
  };
  useEffect(() => {
    if (user.isLoggedIn) {
      axios
        .post(process.env.REACT_APP_BACK_END_URL + "/getProfile", username)
        .then((res) => {
          localStorage.setItem("profileImage", res.data.profileImage);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  });
  //   useEffect(() => {}, [logout]);
  return (
    <div
      onMouseOver={() => {
        setLogout({ display: "flex" });
      }}
      onMouseLeave={() => {
        setTimeout(() => setLogout({ display: "none" }), 500);
      }}
    >
      <div className="flex-container-profile">
        <div
          className="user-pic-nav"
          title={user.username}
          style={{
            backgroundImage: "url('')",
          }}
        ></div>
        <a href={user.isLoggedIn ? "./Account" : "./login"}>
          <h3 className="nav-item unselectable">{user.username}</h3>
        </a>
      </div>
      <div className="user-profile" style={logout}>
        <div
          className="user-pic"
          style={{
            backgroundImage: `url('${profileSrc.src}')`,
          }}
        >
          <a href="/Account">
            <div className="profile-cover">
              <h3 className="nav-item white-text f-12">Change Profile</h3>
            </div>
          </a>
        </div>
        <div className="block-grid">
          <h3 className="nav-item unselectable  white-text">{user.username}</h3>
          <button
            className="pay-button unselectable"
            style={logout}
            onClick={() => {
              localStorage.setItem("userLogin", JSON.stringify(userLogin));
              localStorage.setItem("profileImage", null);
              localStorage.setItem("userToken", null);
              //   history.push("");
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
