import React from "react";
// import Register from "./Components/Register";
// import Otp from "./Components/Otp";
import navData from "./Components/Data";
import { Link } from "react-router-dom";
// import User from "./Components/User";
import useForm from "./Components/useForm";
import { useHistory } from "react-router";
import {
  validateEmail,
  validateOTP,
  validateUser,
  validateAccount,
} from "./Components/validateInfo";

const sideMargin = {
  margin: "0px 10px",
};
let DisplayDates = () => {
  let output = [];
  for (let i = 1; i < 32; i++) {
    output.push(i.toString());
  }
  return output;
};

const Signup = () => {
  let history = useHistory();
  const user = JSON.parse(localStorage.getItem("userLogin"));
  if (user.isLoggedIn) {
    history.push("/Home");
  }
  const {
    registerState,
    handleEmailSubmit,
    handleOTPSubmit,
    values,
    handleChange,
    handleUserSubmit,
    error,
    handleAccountCreation,
  } = useForm(validateEmail, validateOTP, validateUser, validateAccount);

  return (
    <div
      className="signup-body"
      style={{
        backgroundImage: `url("../Assets/luis-vidal-FodEsaNZs48-unsplash.jpg")`,
      }}
    >
      <section className="section-background">
        <div className="form-container">
          <div className="flex-container signup-align">
            <img className="nav-logo-img" src={navData.logo} alt="" />
            <h1 className="nav-header-red unselectable">
              Fit<span>Link</span>
            </h1>
          </div>
          {(() => {
            switch (registerState) {
              case null:
                return (
                  <form className="form-style" onSubmit={handleEmailSubmit}>
                    <h1 class="sub-header center-align unselectable">
                      Sign Up
                    </h1>
                    <span className="block-align">
                      <label
                        htmlFor="email"
                        className="form-label white-text unselectable"
                      >
                        Email:
                      </label>
                      <input
                        type="text"
                        name="email"
                        className="form-input-text unselectable"
                        placeholder="Enter Email"
                        value={values.email}
                        onChange={handleChange}
                      />
                      {error.email && (
                        <p className="sub-title text-red unselectable">
                          {error.email}
                        </p>
                      )}
                    </span>
                    <span className="block-align">
                      <button
                        type="submit"
                        className="form-input-button unselectable center-align"
                        // id="registered"
                      >
                        Send Verification
                      </button>
                    </span>
                    <span className="block-align">
                      <h4 className="sub-title white-text center-align unselectable">
                        Already have an account?{" "}
                        {
                          <Link to="/login" className="text-red">
                            Login
                          </Link>
                        }
                      </h4>
                    </span>
                  </form>
                );
              case "registered":
                return (
                  <form
                    className="form-style"
                    onSubmit={handleOTPSubmit}
                    id="verified"
                  >
                    <h1 className="sub-header center-align unselectable">
                      Verification
                    </h1>
                    <span className="block-align">
                      <label
                        htmlFor="OTP"
                        className="form-label white-text unselectable"
                      >
                        OTP:
                      </label>
                      <input
                        type="text"
                        name="OTP"
                        className="form-input-text unselectable"
                        placeholder="Enter OTP"
                        maxLength="6"
                        value={values.OTP}
                        onChange={handleChange}
                      />
                      {error.OTPerror && (
                        <p className="sub-title text-red unselectable">
                          {error.OTPerror}
                        </p>
                      )}
                    </span>
                    <span className="block-align">
                      <button
                        type="submit"
                        className="form-input-button center-align unselectable"
                      >
                        Verify
                      </button>
                    </span>
                    <span className="block-align">
                      <h4 className="sub-title white-text center-align unselectable">
                        Didn't receive an OTP?{" "}
                        <span
                          className="text-red"
                          onMouseOver={(e) =>
                            (e.target.style.cursor = "pointer")
                          }
                        >
                          Resend
                        </span>
                      </h4>
                    </span>
                  </form>
                );
              case "verified":
                return (
                  <form className="form-style" onSubmit={handleUserSubmit}>
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
                        className="form-input-text unselectable"
                        placeholder="Enter Username"
                        value={values.username}
                        onChange={handleChange}
                      />
                      {error.userError && (
                        <p className="sub-title text-red unselectable">
                          {error.userError.username}
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
                        className="form-input-text unselectable"
                        placeholder="Enter Password"
                        value={values.password}
                        onChange={handleChange}
                      />
                      {error.userError && (
                        <p className="sub-title text-red unselectable">
                          {error.userError.password}
                        </p>
                      )}
                    </span>
                    <span className="block-align bottom-space">
                      <label
                        htmlFor="confirmation"
                        className="form-label white-text unselectable"
                      >
                        Re-type Password:
                      </label>
                      <input
                        type="password"
                        name="confirmation"
                        className="form-input-text unselectable"
                        placeholder="Confirm Password"
                        value={values.confirmation}
                        onChange={handleChange}
                      />
                      {error.userError && (
                        <p className="sub-title text-red unselectable">
                          {error.userError.confirmation}
                        </p>
                      )}
                    </span>
                    <span className="block-align">
                      <button
                        type="submit"
                        className="form-input-button center-align unselectable"
                      >
                        Submit
                      </button>
                    </span>
                  </form>
                );
              case "created":
                return (
                  <form
                    // action="/home"
                    className="form-style"
                    onSubmit={handleAccountCreation}
                  >
                    <span className="block-align bottom-space">
                      <label
                        htmlFor="fname"
                        className="form-label white-text unselectable"
                      >
                        First Name:
                      </label>
                      <input
                        type="text"
                        name="fname"
                        className="form-input-text unselectable"
                        placeholder="Enter Name"
                        value={values.fname}
                        onChange={handleChange}
                      />
                      {error.nameError && (
                        <p className="sub-title text-red unselectable">
                          {error.nameError.fname}
                        </p>
                      )}
                    </span>
                    <span className="block-align bottom-space">
                      <label
                        htmlFor="lname"
                        className="form-label white-text unselectable"
                      >
                        Last Name:
                      </label>
                      <input
                        type="text"
                        name="lname"
                        className="form-input-text unselectable"
                        placeholder="Enter Last Name"
                        value={values.lname}
                        onChange={handleChange}
                      />
                      {error.nameError && (
                        <p className="sub-title text-red unselectable">
                          {error.nameError.lname}
                        </p>
                      )}
                    </span>
                    <span className="block-align bottom-space">
                      <label
                        htmlFor="dob"
                        className="form-label white-text unselectable"
                      >
                        Date Of Birth:
                      </label>
                      {error.nameError && (
                        <p className="sub-title text-red unselectable">
                          {error.nameError.dob}
                        </p>
                      )}
                      <div className="flex-container-sb">
                        <select
                          name="day"
                          className="form-input-text unselectable"
                          style={sideMargin}
                          onChange={handleChange}
                          value={values.day}
                        >
                          <option value={null}>Date</option>
                          {DisplayDates().map((i) => {
                            return (
                              <option key={Number(i)} value={i}>
                                {i}
                              </option>
                            );
                          })}
                        </select>
                        <select
                          name="month"
                          className="form-input-text unselectable"
                          style={sideMargin}
                          onChange={handleChange}
                          value={values.month}
                        >
                          <option value={null}>Month</option>
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">October</option>
                          <option value="November">November</option>
                          <option value="December">December</option>
                        </select>
                        <input
                          type="text"
                          name="year"
                          className="form-input-text unselectable"
                          placeholder="Year"
                          value={values.year}
                          style={sideMargin}
                          onChange={handleChange}
                        />
                      </div>
                    </span>
                    <span className="block-align">
                      <button
                        type="submit"
                        className="form-input-button center-align unselectable"
                        onClick={() => console.log(values)}
                      >
                        Create Account
                      </button>
                    </span>
                  </form>
                );
            }
          })()}
        </div>
      </section>
    </div>
  );
};

export default Signup;
