import React, { useState } from "react";
import "./ContactUs.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
// import { notifyError, notifySuccess } from '../utils/toastify';
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    if (name === "contactNo") {
      // Only allow digits and ensure the number starts with 6-9
      updatedValue = value.replace(/[^0-9]/g, "");
      if (!/^[6-9]/.test(updatedValue)) {
        updatedValue = "";
      }
      if (updatedValue.length > 10) {
        updatedValue = updatedValue.slice(0, 10);
      }
      setFormData({
        ...formData,
        [name]: updatedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await fetch('http://localhost:3000/send-email', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      const url = "http://localhost:4040/api/send-email";
      const response = await axios.post(url, formData);
      console.log("data ", response);
      // alert('Email sent successfully!!');
      toast.success("Email sent successfully!!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000, // Milliseconds
        hideProgressBar: true,
        className: "custom-success-toast",
      });
      setFormData({
        name: "",
        email: "",
        contactNo: "",
        message:"",
      });
    } catch (error) {
      console.error(error);
      // alert('An error occurred. Please try again later.');
      toast.error("An error occurred. Please try again later.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000, // Milliseconds
        hideProgressBar: true,
        className: "custom-error-toast",
      });
    }
  };

  return (
    <div className="contact-form-container">
      <h4>Contact Us</h4>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="contact-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="contact-form-group">
          <label htmlFor="email">Contact Number:</label>
          <input
            type="text"
            id="contactNo"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="contact-form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
