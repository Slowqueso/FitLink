import React from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import IndexContent from "./Components/IndexContent";
import Navbar from "./Components/Navbar";
import { UserProvider } from "./Components/UserContext";

const Home = () => {
  return (
    <UserProvider>
      <div className="ind-body">
        <Navbar></Navbar>
        <Header></Header>
        <IndexContent></IndexContent>
        <Footer></Footer>
      </div>
    </UserProvider>
  );
};

export default Home;
