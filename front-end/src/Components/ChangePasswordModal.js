import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChangePasswordModal = ({ active }) => {
  const user = JSON.parse(localStorage.getItem("userLogin"));
  const modalBackground = useRef(null);
  const [labelVisibility, setLabelVisibility] = useState({
    CURRENT_PASSWORD: "none",
    NEW_PASSWORD: "none",
    CONFIRM_NEW_PASSWORD: "none",
  });
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    email: user.email,
    username: user.username,
    password: "",
    toPassword: "",
    passwordConfirmation: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (values.toPassword === values.passwordConfirmation) {
        const res = await axios.post(
          process.env.REACT_APP_BACK_END_URL + "/changePassword",
          values
        );
        setError(null);
        active(false);
      } else {
        setError("The New Passwords should be the same!");
      }
    } catch (err) {
      console.log(err.response.data.msg);
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
    >
      <div className="modal-container">
        <div className="flex-container-sb">
          <h1 className="content-header unselectable f-26 text-shadow">
            Change Password
          </h1>
          <i
            className="fas fa-times white-text unselectable f-20 close-button"
            onClick={() => active(false)}
          ></i>
        </div>
        {error ? (
          <h1 className="sub-title text-red unselectable">{error}</h1>
        ) : null}
        <form style={{ padding: "10px" }} className="flex-container">
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
                display: labelVisibility.CURRENT_PASSWORD,
                position: "absolute",
                transform: "translateY(-72px) translateX(10px)",
              }}
            >
              Current Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="modal-text-input f-12"
              style={{ marginBottom: "1rem" }}
              placeholder="Enter Current Password"
              onClick={() =>
                setLabelVisibility({
                  ...labelVisibility,
                  CURRENT_PASSWORD: "block",
                })
              }
              onChange={(e) => {
                handleChange(e);
              }}
              onFocus={() => {
                setLabelVisibility({
                  ...labelVisibility,
                  CURRENT_PASSWORD: "block",
                });
              }}
              onBlur={() => {
                setLabelVisibility({
                  ...labelVisibility,
                  CURRENT_PASSWORD: "none",
                });
              }}
            />
            <label
              htmlFor="toPassword"
              className="content-header f-12"
              style={{
                display: labelVisibility.NEW_PASSWORD,
                position: "absolute",
                transform: "translateY(-24px) translateX(10px)",
              }}
            >
              New Password
            </label>
            <input
              id="toPassword"
              type="password"
              name="toPassword"
              className="modal-text-input f-12"
              style={{ marginBottom: "1rem" }}
              placeholder="Enter New Password"
              onChange={(e) => {
                handleChange(e);
              }}
              onClick={() =>
                setLabelVisibility({
                  ...labelVisibility,
                  NEW_PASSWORD: "block",
                })
              }
              onFocus={() => {
                setLabelVisibility({
                  ...labelVisibility,
                  NEW_PASSWORD: "block",
                });
              }}
              onBlur={() => {
                setLabelVisibility({
                  ...labelVisibility,
                  NEW_PASSWORD: "none",
                });
              }}
            />
            <label
              htmlFor="passwordConfirmation"
              className="content-header f-12"
              style={{
                display: labelVisibility.CONFIRM_NEW_PASSWORD,
                position: "absolute",
                transform: "translateY(24px) translateX(10px)",
              }}
            >
              New Password Confirmation
            </label>
            <input
              id="passwordConfirmation"
              type="password"
              name="passwordConfirmation"
              className="modal-text-input f-12"
              style={{ marginBottom: "1rem" }}
              placeholder="Confirm New Password"
              onChange={(e) => {
                handleChange(e);
              }}
              onClick={() =>
                setLabelVisibility({
                  ...labelVisibility,
                  CONFIRM_NEW_PASSWORD: "block",
                })
              }
              onFocus={() => {
                setLabelVisibility({
                  ...labelVisibility,
                  CONFIRM_NEW_PASSWORD: "block",
                });
              }}
              onBlur={() => {
                setLabelVisibility({
                  ...labelVisibility,
                  CONFIRM_NEW_PASSWORD: "none",
                });
              }}
            />
          </div>
          <button
            type="submit"
            style={error ? { transform: "translateY(15px)" } : null}
            className="pay-button unselectable save-button"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Save
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChangePasswordModal;
