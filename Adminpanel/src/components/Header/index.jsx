import React from "react";
import { useNavigate, Link } from "react-router-dom";
import './header.css'
const Header = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("is_logged_in", false);
    console.log(localStorage);
    navigate("/adminpanel/login");
  };
  const handleNavigation = (route) => {
    navigate(route);
  };
  const imageStyles = {
    width: '10rem',
    height: '5rem',
    float:'left'
  };
  return (
    <div>
      <div className="menu-container">
           <Link to="/adminpanel/home" aria-current="page" >
        
        {/* E-Computers and Tutorials */}
        <img src="../../../public/elegant-logo.png" alt="Logo" 
 style={imageStyles}/>
      </Link>
      </div>
      <ul className="nav nav-tabs">

        <li className="nav-item">
        <Link to="/adminpanel/admission" className="nav-link active" aria-current="page" href="#">
            Add Students
          </Link>q
        </li>
        <li className="nav-item">
        <Link to="/adminpanel/listStudents" className="nav-link" href="#">
            View students
          </Link>
        </li>
      <li>  <Link to="/adminpanel/listStudents" className="nav-link" href="#">
            Invoices
          </Link>
        </li>
      </ul>
    </div>

  );
};

export default Header;
