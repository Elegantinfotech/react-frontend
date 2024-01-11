import React from "react";
import "./AdminNavbar.css";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const AdminNavbar = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("is_logged_in", false);
    console.log(localStorage);
    navigate("/adminpanel/login");
    toast.success("Logged out Successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000, // Milliseconds
      hideProgressBar: true,
      className: "custom-success-toast",
    });
  };
  const handleNavigation = (route) => {
    navigate(route);
  };
  const imageStyles = {
    width: "10rem",
    height: "5rem",
    float: "left",
  };
  return (
    <div id="left-container">
      <div>
        <div id="logo-container-admin">
          <Link
            to="/adminpanel/home"
            // aria-current="page"
            href="#"
          >
            <img
              id="logo-admin"
              src="../../../public/elegant-logo.png"
              alt="Logo"
              style={imageStyles}
            />
          </Link>
        </div>
      </div>
      <div className="mob-flex-container">
        <Link
          to="/adminpanel/admission"
          href="#"
          className="tab-admin red-color"
        >
          Add Students
        </Link>
        <Link
          to="/adminpanel/listStudents"
          // aria-current="page"
          href="#"
          className="tab-admin blue-color"
        >
          View All Students
        </Link>
        <Link     to="/adminpanel/createLeader" href="#" className="tab-admin green-color">
          Create PromoCode
        </Link>
        <Link     to="/adminpanel/listLeaders" href="#" className="tab-admin yellow-color">
          List All PromoCodes
        </Link>
        <Link
          href="#"
          to="/adminpanel/listStudents"
          className="tab-admin purple-color"
        >
          Generate Invoice
        </Link>
        <Link
          href="#"
          to="/adminpanel/listStudents"
          className="tab-admin orange-color"
        >
          List Invoices
        </Link>
        <Link
          href="#"
          to="/adminpanel/listStudents"
          className="tab-admin purple-color"
        >
          Pending Fee Calculate
        </Link>
        <Link
          href="#"
          to="/adminpanel/login"
          className="tab-admin yellow-color"
        >
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default AdminNavbar;
