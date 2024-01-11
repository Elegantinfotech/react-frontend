import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Home from './Components/Home';
import ContactUs from './Components/ContactUs';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { isExpired, decodeToken } from "react-jwt";
import { JWT_SECRET } from "../Adminpanel/src/config";
import styles from "../Adminpanel/src/styles.module.css";
import AdminHome from "../Adminpanel/src/components/Home";
import SignUp from "../Adminpanel/src/components/SignUp";
import Dashboard from "../Adminpanel/src/components/Main";
import StudentsList from "../Adminpanel/src/components/studentRegistration/StudentList";
import "react-toastify/dist/ReactToastify.css";
import Admission from "../Adminpanel/src/components/studentRegistration";
import StudentRegister from "../src/Components/StudentRegister";
import Leaders from "../Adminpanel/src/components/Leaders";
import LeadersList from "../Adminpanel/src/components/Leaders/LeaderList";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:4040/api/users/auth";
      const res = await axios.post(url, { email: email, password: password });
      localStorage.clear();
      const token = res.data.data;
      localStorage.setItem("token", token);
      console.log("logged in successfully");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      onLogin(token);
      navigate("/adminpanel/home");
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000, // Milliseconds
        hideProgressBar: true,
        className: "custom-success-toast",
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000, // Milliseconds
          hideProgressBar: true,
          className: "custom-error-toast",
        });
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className={styles.input}
            />
            <button type="submit" className={styles.green_btn}>
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

function AppRouter() {
  const [token, setToken] = useState(null);

   useEffect(() => {
     setToken(null);
     localStorage.clear();
   }, []);
  const handleLogin = (token) => {
    console.log("handlelogin");

    const data = {
      status: false,
      token: "",
    };

    if (!token) {
      data.status = false;
      return data;
    }
    let decodedToken;
    try {
      decodedToken = decodeToken(token, JWT_SECRET);
      const isMyTokenExpired = isExpired(token, JWT_SECRET);

      data.status = isMyTokenExpired ? false : true;
      data.token = decodedToken;
      console.log("121 ", token);
      setToken(token);
      return data;
    } catch (err) {
      data.status = false;
      return data;
    }
  };

  const isAuth = () => {
    // console.log("inside is authenticated")
    return token ? true : false;
  };

  return (
    <Router>
            <ToastContainer />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/adminpanel/login" element={<LoginForm />} />
        <Route path="/adminpanel/sign-up" element={<SignUp />} />
        <Route path="/register" element={<StudentRegister />} />
        <Route path="/adminpanel"
            element={isAuth() ? (<Dashboard />) : (<LoginForm onLogin={handleLogin} />)} />
        <Route path="/adminpanel/home"
            element={isAuth() ? <AdminHome /> : <LoginForm onLogin={handleLogin} />}/>
        <Route path="/adminpanel/dashboard"
            element={isAuth() ? <Dashboard /> : (<LoginForm onLogin={handleLogin} />)}/>
        <Route path="/adminpanel/admission"
            element={isAuth() ? (<Admission onLogin={handleLogin} />) : (
                <LoginForm onLogin={handleLogin} />)}/>
        <Route path="/adminpanel/listStudents"
            element={isAuth() ? (<StudentsList onLogin={handleLogin} />) : (
                <LoginForm onLogin={handleLogin} />)}/>

      <Route
          path="/adminpanel/createLeader"
          element={
            isAuth() ? (
              <Leaders onLogin={handleLogin} />
            ) : (
              <LoginForm onLogin={handleLogin} />
            )
          }
        />
   
      <Route
          path="/adminpanel/listLeaders"
          element={
            isAuth() ? (
              <LeadersList onLogin={handleLogin} />
            ) : (
              <LoginForm onLogin={handleLogin} />
            )
          }
        />   </Routes>
    </Router>
  );
}

export default AppRouter;
