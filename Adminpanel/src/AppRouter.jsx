import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { isExpired, decodeToken } from "react-jwt";
import { JWT_SECRET } from "./config";
import styles from "./styles.module.css";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Main";
import StudentsList from "./components/studentRegistration/StudentList";
import "react-toastify/dist/ReactToastify.css";
import Admission from "./components/studentRegistration";
// import Header from "./components/Header";
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
      navigate("/dashboard");
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
const AppRouter = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(null);
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
      console.log("118 ", token);
      setToken(token);
      return data;
    } catch (err) {
      data.status = false;
      return data;
    }
  };

  const isAuthenticated = () => {
    return token ? true : false;
  };

  return (
    <Router>
      <div className="App">
        {/* <ToastContainer /> */}
  
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <Dashboard />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/home"
            element={
              isAuthenticated() ? <Home /> : <LoginForm onLogin={handleLogin} />
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated() ? (
                <Dashboard />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/admission"
            element={
              isAuthenticated() ? (
                <Admission onLogin={handleLogin} />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />
                    <Route
            path="/listStudents"
            element={
              isAuthenticated() ? (
                <StudentsList onLogin={handleLogin} />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />
           <Route
            path="/promoCode"
            element={
              isAuthenticated() ? (
                <StudentsList onLogin={handleLogin} />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
