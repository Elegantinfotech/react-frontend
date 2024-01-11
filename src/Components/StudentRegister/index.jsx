import React, { useState, useEffect } from "react";
import "./StudReg.css";
import NavBar from "../NavigationBar";
import { toast } from "react-toastify";

const StudentRegistrationForm = () => {
  let studentID="";
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "",
    course: "",
    branch: "",
    resAddress: "",
    education: "",
    pinCode: "",
    religion: "",
    occupation: "",
    category: "",
    contactNo: "",
    promoCode:"",
    errors: {
      fullName: "",
      email: "",
      fatherName: "",
      motherName: "",
      dob: "",
      gender: "",
      course: "",
      branch: "",
      resAddress: "",
      education: "",
      pinCode: "",
      religion: "",
      occupation: "",
      category: "",
      contactNo: "",
    },
  });
  const token = localStorage.getItem("token");
  useEffect(() => {
    console.log("43 ", token);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (
      name === "fullName" ||
      name === "fatherName" ||
      name === "motherName" ||
      name === "religion" ||
      name === "occupation" ||
      name === "education" ||
      name === "category"
    ) {
      // Only allow alphabets in the field
      updatedValue = value.replace(/[^A-Za-z]/g, "");
    }
    if (name === "pinCode") {
      updatedValue = value.replace(/[^0-9]/g, "");
      if (updatedValue.length > 6) {
        updatedValue = updatedValue.slice(0, 6);
      }
    }
    if (name === "contactNo") {
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
      fetch("http://localhost:4040/api/students/admission", {
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
          studentID=data.studId;
          console.log("Form submitted successfully!!!:", data);
          // Reset the form
          setFormData({
            fullName: "",
            email: "",
            fatherName: "",
            motherName: "",
            dob: "",
            gender: "",
            course: "",
            branch: "",
            resAddress: "",
            education: "",
            pinCode: "",
            religion: "",
            occupation: "",
            category: "",
            contactNo: "",
          });
          toast.success("Form submitted successfully!!!:", studId, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000, // Milliseconds
            hideProgressBar: true,
            className: "custom-success-toast",
          });
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
    const {
      fullName,
      email,
      fatherName,
      motherName,
      dob,
      gender,
      course,
      branch,
      resAddress,
      education,
      pinCode,
      religion,
      occupation,
      category,
      contactNo,
    } = formData;

    if (
      fullName.trim() === "" ||
      email.trim() === "" ||
      fatherName.trim() === "" ||
      motherName.trim() === "" ||
      dob.trim() === "" ||
      gender.trim() === "" ||
      course.trim() === "" ||
      branch.trim() === "" ||
      resAddress.trim() === "" ||
      education.trim() === "" ||
      pinCode.trim() === "" ||
      religion.trim() === "" ||
      occupation.trim() === "" ||
      category.trim() === "" ||
      contactNo.trim() === ""
    ) {
      toast.success("Please fill in all fields", {
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
    <div>

      <div className="reg-form-container">
        <h4 className="green-text">Register Here</h4>
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
            <label>Father's Name:</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
            />
          </div>
          <div className="reg-form-group">
            <label>Mother's Name: </label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
            />
          </div>
          <div className="reg-form-group">
            <label>Date of Birth: </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
          <div className="reg-form-group">
            <label>Gender: </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="reg-form-group">
            <label>Course: </label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="">Select course</option>
              <option value="Basics">Basic Computers and Fundamentals</option>
              <option value="AdvanceExcel">Advance Excel</option>
              <option value="Tally">TALLY ERP 9 + GST</option> 
               <option value="Spoken-English">Spoken English</option>
              <option value="C">C</option>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="Advance-C">Advance C & Data Structure</option>
              <option value="Web-Designing">Web Designing</option>
              <option value="Full-Stack">Full Stack Development</option>
            </select>
          </div>
          <div className="reg-form-group">
            <label>Branch: </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
            >
              <option value="">Select branch</option>
              <option value="bhadravathi">Bhadravathi</option>
              <option value="honnali">Honnali</option>
              <option value="sagara">Sagara</option>
              <option value="Shikaripura">Shikaripura</option>
              <option value="Soraba">Soraba</option>
            </select>
          </div>
          <div className="reg-form-group">
            <label>Residential Address: </label>
            <input
              type="text"
              name="resAddress"
              value={formData.resAddress}
              onChange={handleChange}
            />
          </div>
          <div className="reg-form-group">
            <label>Education Qualification: </label>
       <select
              name="education"
              value={formData.education}
              onChange={handleChange}
            >
              <option value="">Select Education</option>
              <option value="SSLC">SSLC</option>
              <option value="Graduate">Graduate</option>
              <option value="Post-graduate">Post Graduate</option>
   
            </select>
          </div>
          <div className="reg-form-group">
            <label>Occupation: </label>

       <select
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            >
              <option value="">Select Occupation</option>
              <option value="Employeed">Employeed</option>
              <option value="UnEmployeed">UnEmployeed</option>
              <option value="Student">Student</option>
            </select>
          </div>
          <div className="reg-form-group">
            <label>Pin Code: </label>
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
            />
          </div>
          <div className="reg-form-group">
            <label>
              Contact Number:
    
            <span className="small-text">(preferably whatsapp)  </span>      </label>
            <input
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
            />
          </div>
          <div className="reg-form-group">
            <label>Religion: </label>
              <select
              name="religion"
              value={formData.religion}
              onChange={handleChange}
            >
              <option value="">Select Religion</option>
              <option value="Hindu">Hindu</option>
              <option value="Muslim">Muslim</option>
              <option value="Christian">Christian</option>
            </select>
          </div>
          <div className="reg-form-group">
            <label>Category: </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </div>
          <div className="reg-form-group">
            <label>Promo Code</label>
            <input
              type="text"
              name="promoCode"
              value={formData.promoCode}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default StudentRegistrationForm;
