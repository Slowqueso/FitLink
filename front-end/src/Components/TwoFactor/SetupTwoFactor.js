import axios from "axios";
import React, { useState, useRef } from "react";

const SetupTwoFactor = ({ active, username }) => {
  const modalBackground = useRef(null);
  const [labelVisibility, setLabelVisibility] = useState("none");
  const [submitted, setSubmitted] = useState(false);
  const [height, setHeight] = useState("300px");
  const [passwordValue, setPasswordValue] = useState({
    password: "",
    username: username,
  });

  const [error, setError] = useState();
  const handleChange = (e) => {
    setPasswordValue({
      ...passwordValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACK_END_URL + "/twoFactorPassVerification",
        passwordValue
      );
      setHeight("200px");
      setError(res.data.msg);
      setSubmitted(true);
      //   active(false);
    } catch (err) {
      setError(err.response.data.msg);
    }
  };
  return (
    <section
      className="modal-background"
      ref={modalBackground}
      onClick={(e) => {
        if (e.target.className === modalBackground.current.className) {
          active(false);
        }
      }}
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
    >
      <div
        className="modal-container"
        style={{ width: "400px", height: height }}
      >
        <div className="flex-container-sb">
          <h1 className="content-header unselectable f-26 text-shadow">
            Enable or Disable Two Factor Authenticaion
          </h1>
          <i
            className="fas fa-times white-text unselectable f-20 close-button"
            onClick={() => {
              active(false);
            }}
            style={{ position: "absolute", right: "10px", top: "20px" }}
          ></i>
        </div>
        {error ? (
          <h1 className="sub-title text-red unselectable">{error}</h1>
        ) : null}
        <form className="flex-container" style={{ padding: "10px" }}>
          {!submitted ? (
            <div
              className="block-align"
              style={{
                margin: "1rem",
                padding: "5px",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <label
                htmlFor="password"
                className="content-header f-12"
                style={{
                  display: labelVisibility,
                  position: "absolute",
                  transform: "translateY(-16px) translateX(10px)",
                }}
              >
                Password
              </label>
              <input
                type="password"
                className="modal-text-input f-12"
                id="password"
                name="password"
                value={passwordValue.password}
                placeholder="Enter Password"
                onClick={() => {
                  setLabelVisibility("block");
                }}
                onFocus={() => {
                  setLabelVisibility("block");
                }}
                onBlur={() => {
                  setLabelVisibility("none");
                }}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
          ) : null}
          {!submitted ? (
            <button
              className="pay-button unselectable save-button"
              onClick={(e) => {
                handleOtpSubmit(e);
              }}
              type="submit"
            >
              Verify
            </button>
          ) : null}
        </form>
      </div>
    </section>
  );
};

export default SetupTwoFactor;
