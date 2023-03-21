import React, { useState, useEffect, useContext } from "react";
import "../styles/styles.css";
// import logo from "front-end/public/Assets/dumbbell.png";
import navData from "./Data.js";
import { UserContext, UserProvider } from "./UserContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import UserProfile from "./UserProfile";

const Navbar = (props) => {
  const user = JSON.parse(localStorage.getItem("userLogin"));
  const userLogin = { isLoggedIn: false };
  const history = useHistory();
  useEffect(() => {
    // console.log(user);
  }, [user]);

  return (
    <div>
      <nav>
        <div
          className="navbar"
          style={props.position ? { position: props.position } : {}}
        >
          <ul>
            <li>
              <a href="/Home">
                <h3 className="nav-item unselectable">{navData.item1}</h3>
              </a>
            </li>
            <li>
              <a href="/FitCal">
                <h3 className="nav-item unselectable">{navData.item2}</h3>
              </a>
            </li>
            <a href="/">
              <li>
                <div className="nav-logo">
                  <img
                    className="nav-logo-img unselectable"
                    src={navData.logo}
                    alt=""
                  ></img>
                  <h2 className="nav-header unselectable">
                    Fit<span>Link</span>
                  </h2>
                </div>
              </li>
            </a>
            <li>
              <a href="/dailyTask">
                <h3 className="nav-item unselectable">{navData.item3}</h3>
              </a>
            </li>
            <li style={{ display: "flex" }}>
              {user.isLoggedIn ? (
                <UserProfile />
              ) : (
                <Link to="/login">
                  <h3 className="nav-item unselectable">Login</h3>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
