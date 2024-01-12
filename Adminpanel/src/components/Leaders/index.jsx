import React, { useState, useEffect } from "react";
import "../Leaders/LeaderRegistration.css";
import AdminNavbar from "../AdminNavbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PromoCode = () => {
  let leaderID = "",
    promoCode = "";
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone_number: "",
    type: "",
    errors: {
      fullName: "",
      email: "",
      address: "",
      phone_number: "",
      type: "",
    },
  });
  const token = localStorage.getItem("token");
  useEffect(() => {
    // console.log("43 ", token);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    if (name === "fullName") {
      // Only allow alphabets in the field
      updatedValue = value.replace(/[^A-Za-z]/g, "");
    }
    if (name === "phone_number") {
      // Only allow digits and ensure the number starts with 6-9
      updatedValue = value.replace(/[^0-9]/g, "");
      if (!/^[6-9]/.test(updatedValue)) {
        updatedValue = "";
      }
      if (updatedValue.length > 10) {
        updatedValue = updatedValue.slice(0, 10);
      }
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch("http://localhost:4040/api/leaders/create", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server
          leaderID = data.leader_id;
          promoCode = data.promoCode;
          console.log("Form submitted successfully!!!:", data);
          // Reset the form
          setFormData({
            fullName: "",
            email: "",
            address: "",
            phone_number: "",
            type: "",
          });
          toast.success(
            "Successfull!!!: Leader ID " + leaderID + " PromoCode " + promoCode,
            {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000, // Milliseconds
              hideProgressBar: true,
              className: "custom-success-toast",
            }
          );
          //navigate("/dashboard");
        })
        .catch((error) => {
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
        });
    }
  };
  const validateForm = () => {
    const { fullName, email, address, phone_number, type } = formData;

    if (
      fullName?.trim() === "" ||
      email?.trim() === "" ||
      address?.trim() === "" ||
      phone_number === "" ||
      type === ""
    ) {
      toast.error("Please fill in all fields", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000, // Milliseconds
        hideProgressBar: true,
        className: "custom-success-toast",
      });
      console.log("Please fill in all fields");
      return false;
    }

    return true;
  };
  return (
    <div className="admin-body">
      <AdminNavbar />

      <div id="right-container">
        <div className="reg-form-container">
          <h4 className="green-text">Add Leader Here</h4>
          <form className="reg-form" onSubmit={handleSubmit}>
            <div className="reg-scroll">
              <div className="reg-form-group">
                <label>Full Name: </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="reg-form-group">
                <label>Email: </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="reg-form-group">
                <label>Residential Address: </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="reg-form-group">
                <label>Type: </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="">Select Type</option>
                  <option value="Student">Student</option>
                  <option value="Lecturer">Lecturer</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="reg-form-group">
                <label>
                  Contact Number:
                  <span className="small-text">(preferably whatsapp)</span>
                </label>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </div>{" "}
              <button type="submit" variant="primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default PromoCode;
