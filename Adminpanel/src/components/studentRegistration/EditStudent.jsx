import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import moment from "moment";
import "./StudentRegistrationForm.css";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const EditStudent = ({ showModal, handleClose, student }) => {
  const [editedStudent, setEditedStudent] = useState({ ...student });
  const [dobDate,setdobDate]=useState(student.dob);
  let studentId = "";
  const token = localStorage.getItem("token");
  useEffect(() => {
    // console.log("Student ",student);
  });
  const formatddmmyyyy = (date) => {
    if (!date) return ""; // Handle cases where the date is not set
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date)
      .toLocaleDateString("en-GB"
      // , options)
      // .split("/")
      // .join("-");
      );
  };
  const formatyyyymmdd = (date) => {
    if (!date) return ""; // Handle cases where the date is not set
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date)
      .toLocaleDateString("en-GB", options)
      .split("/")
      .join("-");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("edited data ", editedStudent);
    if (validateForm()) {
      editedStudent.dob = formatyyyymmdd(editedStudent.dob);
      console.log("yyyymmdd date",editedStudent.dob);
      fetch(
        `http://localhost:4040/api/students/updateById?studId=${editedStudent.studId}`,
        {
          method: "PUT",
          body: JSON.stringify(editedStudent),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server
          studentId = data.studId;
          console.log("Form Updated successfully!!!:", data);
          // Reset the form
          setEditedStudent({
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
          toast.success(
            "Form Editted successfully!!! Student ID is:  " + studentId,
            {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000, // Milliseconds
              hideProgressBar: true,
              className: "custom-success-toast",
            }
          );
          // navigate("/listStudents");
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
    handleClose();
  };
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
    setEditedStudent((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
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
    } = editedStudent;

    if (
      fullName?.trim() === "" ||
      email?.trim() === "" ||
      fatherName?.trim() === "" ||
      motherName?.trim() === "" ||
      dob=== "" ||
      gender === "" ||
      course === "" ||
      branch === "" ||
      resAddress === "" ||
      education === "" ||
      pinCode === "" ||
      religion === "" ||
      occupation === "" ||
      category === "" ||
      contactNo === ""
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
  const handleDateChange = (event) => {
    const newDate = new Date(event.target.value);
    setEditedStudent((prevState) => ({
      ...prevState,
      [name]: newDate,
    }));
  };
  const formatToDisplay = (date) => {
    if (!date) return ""; // Handle cases where the date is not set
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date)
      .toLocaleDateString("en-GB");
      // , options)
      // .split("/")
      // .join("-");
  };
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="reg-form-container">
          {/* <h4 className="green-text">Register Here</h4> */}
          <form className="reg-form" onSubmit={handleSubmit}>
            <div className="reg-scroll">
              <div className="reg-form-group">
                <label>Full Name: </label>
                <input
                  type="text"
                  name="fullName"
                  value={editedStudent.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="reg-form-group">
                <label>Email: </label>
                <input
                  type="email"
                  name="email"
                  value={editedStudent.email}
                  onChange={handleChange}
                />
              </div>
              <div className="reg-form-group">
                <label>Father's Name:</label>
                <input
                  type="text"
                  name="fatherName"
                  value={editedStudent.fatherName}
                  onChange={handleChange}
                />
              </div>
              <div className="reg-form-group">
                <label>Mother's Name: </label>
                <input
                  type="text"
                  name="motherName"
                  value={editedStudent.motherName}
                  onChange={handleChange}
                />
              </div>
              <div className="reg-form-group">
                <label>Date of Birth: </label>
                {/* <DatePicker
                  selected={editedStudent.dob}
                  onChange={handleChange}
                  dateFormat="dd/MM/yyyy"
                /> */}
                <input
                  // type="date" 
                   type="text"
                  name="dob"
                  value={formatddmmyyyy(editedStudent.dob)}
                  onChange={handleDateChange}
                  // placeholder="dd/mm/yyyy"
                 // pattern="\d{2}/\d{2}/\d{4}"
                />
              </div>
              <div className="reg-form-group">
                <label>Gender: </label>
                <select
                  name="gender"
                  value={editedStudent.gender}
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
                  value={editedStudent.course}
                  onChange={handleChange}
                >
                  <option value="">Select course</option>
                  <option value="Basics">
                    Basic Computers and Fundamentals
                  </option>
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
                  value={editedStudent.branch}
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
                  value={editedStudent.resAddress}
                  onChange={handleChange}
                />
              </div>
              <div className="reg-form-group">
                <label>Education Qualification: </label>
                <select
                  name="education"
                  value={editedStudent.education}
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
                  value={editedStudent.occupation}
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
                  value={editedStudent.pinCode}
                  onChange={handleChange}
                />
              </div>
              <div className="reg-form-group">
                <label>
                  Contact Number:
                  <span className="small-text">
                    (preferably whatsapp){" "}
                  </span>{" "}
                </label>
                <input
                  type="text"
                  name="contactNo"
                  value={editedStudent.contactNo}
                  onChange={handleChange}
                />
              </div>
              <div className="reg-form-group">
                <label>Religion: </label>
                <select
                  name="religion"
                  value={editedStudent.religion}
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
                  value={editedStudent.category}
                  onChange={handleChange}
                >
                  <option value="">Select category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>
              <button type="submit" variant="secondary">
                Save Changes
              </button>
              {/* <button variant="secondary" onClick={handleClose}>
          Cancel
        </button> */}
            </div>
          </form>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default EditStudent;
