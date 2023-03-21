import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const TwoFactorAuthModal = ({ active, username, userData }) => {
  const history = useHistory();
  const modalBackground = useRef(null);
  const [labelVisibility, setLabelVisibility] = useState("none");
  const [enteredOTP, setEnteredOTP] = useState({
    OTP: "",
    username: username,
  });

  const [error, setError] = useState();
  const handleChange = (e) => {
    setEnteredOTP({
      ...enteredOTP,
      [e.target.name]: e.target.value,
    });
  };
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const otpFlag = await axios.post(
        process.env.REACT_APP_BACK_END_URL + "/otpVerification",
        enteredOTP
      );
      console.log(otpFlag);
      if (otpFlag.data.flag) {
        // console.log(userData);
        localStorage.setItem("userLogin", JSON.stringify(userData));
        history.push("/Home");
      }
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
        style={{ width: "400px", height: "200px" }}
      >
        <div className="flex-container-sb">
          <h1 className="content-header unselectable f-26 text-shadow">
            Two Factor Authentication
          </h1>
          <i
            className="fas fa-times white-text unselectable f-20 close-button"
            onClick={() => {
              active(false);
            }}
          ></i>
        </div>
        {error ? (
          <h1 className="sub-title text-red unselectable">{error}</h1>
        ) : null}
        <form className="flex-container" style={{ padding: "10px" }}>
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
              htmlFor="OTP"
              className="content-header f-12"
              style={{
                display: labelVisibility,
                position: "absolute",
                transform: "translateY(-16px) translateX(10px)",
              }}
            >
              One Time Password (OTP)
            </label>
            <input
              type="text"
              className="modal-text-input f-12"
              id="OTP"
              name="OTP"
              value={enteredOTP.OTP}
              placeholder="Enter OTP"
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
          <button
            className="pay-button unselectable save-button"
            onClick={(e) => {
              handleOtpSubmit(e);
            }}
            type="submit"
          >
            Verify
          </button>
        </form>
      </div>
    </section>
  );
};

export default TwoFactorAuthModal;
