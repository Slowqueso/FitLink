import React, { useContext, useState } from "react";
import "./styles/styles.css";
import navData from "./Components/Data";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { validateLogin, validateUser } from "./Components/validateInfo";
import TwoFactorAuthModal from "./Components/TwoFactor/TwoFactorAuthModal";
import axios from "axios";

const Login = () => {
  const [modalFlag, setModalFlag] = useState(false);
  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
    OTP: "",
  });
  const [userData, setUserData] = useState();
  const [loginError, setLoginError] = useState({});
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginValues({
      ...loginValues,
      [name]: value,
    });
  };
  let history = useHistory();
  const user = JSON.parse(localStorage.getItem("userLogin"));
  if (user.isLoggedIn) {
    history.push("/Home");
    // history.goBack();
  }
  const getPfp = async (username) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACK_END_URL + "/getProfile",
        username
      );
      localStorage.setItem("profileImage", res.data.profileImage);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(loginValues);
    setLoginError(validateLogin(loginValues));
    if (validateLogin(loginValues).isValidated) {
      axios
        .post("http://localhost:8001/login", {
          username: loginValues.username,
          password: loginValues.password,
        })
        .then(async (response) => {
          const { username, email, dob, fname, token, profileImage } =
            response.data;
          const userLogin = {
            username,
            email,
            dob,
            fname,
            token,
            isLoggedIn: true,
          };
          if (response.data.OTP) {
            setModalFlag(true);
            // localStorage.setItem("userLogin", JSON.stringify(userLogin));
            // localStorage.setItem("username", userLogin.username);
            setUserData(userLogin);
          } else {
            if (response.data.success) {
              localStorage.setItem("userToken", JSON.stringify(token));
              localStorage.setItem("userLogin", JSON.stringify(userLogin));
              localStorage.setItem(
                "profileImage",
                JSON.stringify(profileImage)
              );
              history.push("/Home");
              // history.goBack();
              getPfp(username);
            }
          }
        })
        .catch((err) => {
          if (err.response.data.type === "password") {
            setLoginError({
              userError: {
                password: err.response.data.msg,
              },
            });
          } else {
            setLoginError({
              userError: {
                username: err.response.data.msg,
              },
            });
          }
          console.log(err);
        });
    }
  };

  return (
    <div
      className="login-body"
      style={{
        backgroundImage: `url("../Assets/luis-vidal-FodEsaNZs48-unsplash.jpg")`,
      }}
    >
      {modalFlag ? (
        <TwoFactorAuthModal
          handleLoginChange={handleLoginChange}
          active={setModalFlag}
          username={loginValues.username}
          userData={userData}
        />
      ) : null}
      <section className="section-background">
        <div className="form-container">
          <div className="flex-container signup-align">
            <img src={navData.logo} alt="" className="nav-logo-img" />
            <h1 className="nav-header-red unselectable">
              Fit<span>Link</span>
            </h1>
          </div>
          <form className="form-style" onSubmit={handleLogin}>
            <span className="block-align bottom-space">
              <label
                htmlFor="username"
                className="form-label white-text unselectable"
              >
                Username:
              </label>
              <input
                type="text"
                name="username"
                onChange={handleLoginChange}
                value={loginValues.username}
                className="form-input-text unselectable"
                placeholder="Enter Username"
              />
              {loginError.userError && (
                <p className="sub-title text-red unselectable">
                  {loginError.userError.username}
                </p>
              )}
            </span>
            <span className="block-align bottom-space">
              <label
                htmlFor="password"
                className="form-label white-text unselectable"
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                onChange={handleLoginChange}
                value={loginValues.password}
                className="form-input-text unselectable"
                placeholder="Enter Password"
              />
              {loginError.userError && (
                <p className="sub-title text-red unselectable">
                  {loginError.userError.password}
                </p>
              )}
            </span>
            <span className="block-align">
              <button
                type="submit"
                className="form-input-button center-align unselectable"
              >
                Login
              </button>
            </span>
            <span className="block-align">
              <h4 className="sub-title white-text center-align unselectable">
                New Here?{" "}
                {
                  <Link to="/signup" className="text-red">
                    Sign Up
                  </Link>
                }
              </h4>
            </span>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
