import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import navData from "./Components/Data";
import { useHistory } from "react-router";

const Output = (props) => {
  return (
    <span className="block-align bottom-space">
      <h3 className="form-label white-text unselectable">
        Your BMI: {props.bmi}
      </h3>
    </span>
  );
};
const FitCal = (props) => {
  let history = useHistory();
  const user = JSON.parse(localStorage.getItem("userLogin"));
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [bmi, setBMI] = useState();
  useEffect(() => {}, [bmi]);
  const calculateBMI = (weight, height) => {
    return weight / (height * height);
  };
  if (!user.isLoggedIn) {
    history.push("/login");
  }
  return (
    <div
      className="fit-body"
      style={
        props.backgroundImage
          ? { backgroundImage: `url('${props.backgroundImage}')` }
          : {}
      }
    >
      <Navbar></Navbar>
      <section className="section-background">
        <div className="form-container">
          <div className="flex-container signup-align">
            <img className="nav-logo-img" src={navData.logo} alt="" />
            <h1 className="nav-header-red unselectable">
              Fit<span>Link</span>
            </h1>
          </div>
          <form className="form-style">
            <span className="block-align bottom-space">
              <label
                htmlFor="height"
                className="form-label white-text unselectable"
              >
                Height:
              </label>
              <input
                type="number"
                name="height"
                id="height"
                className="form-input-text unselectable"
                placeholder="Enter Height (in m)"
                onChange={(e) => {
                  setHeight(Number(e.target.value));
                }}
              />
            </span>
            <span className="block-align bottom-space">
              <label
                htmlFor="weight"
                className="form-label white-text unselectable"
              >
                Weight:
              </label>
              <input
                type="number"
                name="weight"
                id="weight"
                className="form-input-text unselectable"
                placeholder="Enter Weight (in kg)"
                onChange={(e) => {
                  setWeight(Number(e.target.value));
                }}
              />
            </span>
            <span className="block-align bottom-space">
              <button
                type="reset"
                className="form-input-reset center-align unselectable"
                onClick={() => {
                  setHeight(null);
                  setWeight(null);
                  setBMI(false);
                }}
              >
                Reset
              </button>
            </span>
            {bmi ? <Output bmi={calculateBMI(weight, height)}></Output> : null}
          </form>
          <span className="block-align">
            <button
              className="form-input-button center-align unselectable"
              onClick={() => {
                setBMI(true);
              }}
            >
              Calculate BMI
            </button>
          </span>
        </div>
      </section>
    </div>
  );
};

export default FitCal;
