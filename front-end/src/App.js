import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "./Components/Loading";
import Home from "./Home";
import Splash from "./Splash";
import Login from "./Login";
import Signup from "./Signup";
import FitCal from "./FitCal";
import Account from "./Account";
import { UserProvider, UserContext } from "./Components/UserContext";
import axios from "axios";

const userCheck = localStorage.getItem("userLogin");
if (!userCheck) {
  const userLogin = { isLoggedIn: false };
  localStorage.setItem("userLogin", JSON.stringify(userLogin));
}
const App = () => {
  const username = {
    username: JSON.parse(localStorage.getItem("userLogin")).username,
  };
  // useEffect(async () => {
  //   if (userCheck.isLoggedIn) {
  //     try {
  //       const res = await axios.post(
  //         process.env.REACT_APP_BACK_END_URL + "/getProfile",
  //         username
  //       );
  //       localStorage.setItem("profileImage", res.data.profileImage);
  //     } catch (err) {
  //       console.log(err.response.data);
  //     }
  //   }
  // });
  const [loading, setLoading] = useState(true);
  const hideLoader = () => {
    setTimeout(() => setLoading(false), 1500);
  };
  return (
    <div onLoad={hideLoader} className="ind-body">
      {loading ? <Loading></Loading> : null}
      <Router>
        <Route exact path="/Home">
          <Home></Home>
        </Route>
        <Route exact path="/">
          <Splash></Splash>
        </Route>
        <Route exact path="/login">
          <UserProvider>
            <Login></Login>
          </UserProvider>
        </Route>
        <Route exact path="/signup">
          <UserProvider>
            <Signup></Signup>
          </UserProvider>
        </Route>
        <Route exact path="/fitcal">
          <FitCal backgroundImage="../Assets/fitsum-admasu-oGv9xIl7DkY-unsplash.jpg"></FitCal>
        </Route>
        <Route exact path="/Account">
          <Account></Account>
        </Route>
      </Router>
    </div>
  );
};

export default App;
