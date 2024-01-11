import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import moment from "moment";
import "./LeaderRegistration.css"; 
import { toast } from "react-toastify";
const EditLeader = ({ showModal, handleClose, leader }) => {
  const [editedLeader, setEditedLeader] = useState({ ...leader });
  let leader_id = "";
  const handleInputChange = (event) => {
    // console.log("type of ",event.type);
    const { name, value } = event.target;
    console.log(name, value);
    setEditedLeader((prevLeader) => ({
      ...prevLeader,
      [name]: value,
    }));
  };
  const token = localStorage.getItem("token");
  useEffect(() => {
  });
  const formatDateForInput = (date) => {
    const options = {year: 'numeric' , day: '2-digit', month: '2-digit' };
    return new Date(date).toLocaleDateString('en-GB', options).split('/').join('-');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("edited data ", editedLeader);
    if (validateForm()) {
      fetch("http://localhost:4040/api/leaders/updateById?"+editedLeader.leader_id, {
        method: "PUT",
        body: JSON.stringify(editedLeader),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server
          leader_id = data.leader_id;
          console.log("Form Updated successfully!!!:", data);
          // Reset the form
          seteditedLeader({
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
          toast.success("Form Editted successfully!!! Leader ID is:  " + leader_id, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000, // Milliseconds
            hideProgressBar: true,
            className: "custom-success-toast",
          });
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
  const validateForm = () => {
    const { fullName, email, resAddress, phone_number,type} = formData;

    if (
      fullName?.trim() === "" ||
      email?.trim() === "" ||
      resAddress?.trim() === "" ||
      phone_number === "" ||
      type===""
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
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Leader</Modal.Title>
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
                value={editedLeader.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="reg-form-group">
              <label>Email: </label>
              <input
                type="email"
                name="email"
                value={editedLeader.email}
                onChange={handleChange}
              />
            </div>
            <div className="reg-form-group">
              <label>Father's Name:</label>
              <input
                type="text"
                name="fatherName"
                value={editedLeader.fatherName}
                onChange={handleChange}
              />
            </div>
            <div className="reg-form-group">
              <label>Mother's Name: </label>
              <input
                type="text"
                name="motherName"
                value={editedLeader.motherName}
                onChange={handleChange}
              />
            </div>
            <div className="reg-form-group">
              <label>Date of Birth: </label>
              <input
                type="date"
                name="dob"
                value={formatDateForInput(editedLeader.dob)}
                // value={editedLeader.dob}
                // value={()=>{
                //   editedLeader.dob.toLocaleDateString('en-GB', {
                //     day: 'numeric',
                //     month: 'numeric',
                //     year: 'numeric'})}}
                onChange={handleChange}
                //  pattern="\d{2}-\d{2}-\d{4}"placeholder="dd-mm-yyyy" required
              />
            </div>
            <div className="reg-form-group">
              <label>Gender: </label>
              <select
                name="gender"
                value={editedLeader.gender}
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
                value={editedLeader.course}
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
                value={editedLeader.branch}
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
                value={editedLeader.resAddress}
                onChange={handleChange}
              />
            </div>
            <div className="reg-form-group">
              <label>Education Qualification: </label>
              <select
                name="education"
                value={editedLeader.education}
                onChange={handleChange}
              >
                <option value="">Select Education</option>
                <option value="SSLC">SSLC</option>
                <option value="Graduate">Graduate</option>
                <option value="Post-graduate">Post Graduate</option>
              </select>
            </div>
            <div className="reg-form-group">
              <label>Occupation: </label><select
                name="occupation"
                value={editedLeader.occupation}
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
                value={editedLeader.pinCode}
                onChange={handleChange}
              />
            </div>
            <div className="reg-form-group">
              <label>
                Contact Number:
                <span className="small-text">(preferably whatsapp) </span>{" "}
              </label>
              <input
                type="text"
                name="contactNo"
                value={editedLeader.contactNo}
                onChange={handleChange}
              />
            </div>
            <div className="reg-form-group">
              <label>Religion: </label>
              <select
                name="religion"
                value={editedLeader.religion}
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
                value={editedLeader.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>
            <button type="submit" variant="secondary">Save Changes</button>
</div>
        </form>
      </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditLeader;
