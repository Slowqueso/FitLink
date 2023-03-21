import React from "react";
import { useHistory } from "react-router";
import Navbar from "./Components/Navbar";
import AccountContent from "./Components/AccountContent";

const Account = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("userLogin"));
  if (!user.isLoggedIn) {
    history.push("/login");
  }

  return (
    <div className="ind-body">
      <Navbar position="sticky"></Navbar>
      <AccountContent></AccountContent>
    </div>
  );
};

export default Account;
