import React from "react";
import AdminNavbar from "../AdminNavbar";
import "../../App.css"
const Home = () => {
  return (
    <div className="admin-body">
      {/* <div id="left-container"> */}
        <AdminNavbar />
      {/* </div> */}
      {/* <div className="container-home"> */}
      <div id="right-container">
        <h1>Welcome to Admin Panel</h1>
      </div>
    </div>
  );
};

export default Home;
