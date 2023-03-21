import React, { createContext, useState } from "react";
import Navbar from "./Navbar";
import Home from "../Home";
import Splash from "../Splash";
import useForm from "./useForm";
export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    dob: "",
    fname: "",
    token: "",
    isLoggedIn: false,
  });
  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider };
