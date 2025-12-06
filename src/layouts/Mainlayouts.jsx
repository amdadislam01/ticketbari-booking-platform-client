import React from "react";
import Navbar from "../shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../shared/Footer/Footer";

const Mainlayouts = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[63vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Mainlayouts;
