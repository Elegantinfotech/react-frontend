import React, { useEffect, useState } from "react";
import { Table, Pagination, Button, Modal, Form } from "react-bootstrap";
import EditStudent from "./EditStudent";
import AddStudModal from "./AddStudModal";
import "./StudentRegistrationForm.css";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import AdminNavbar from "../AdminNavbar";
import { toast } from "react-toastify";

const StudentList = () => {
  const studentsPerPage = 5;
  let navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);

  const token = localStorage.getItem("token");
  const fetchList = () => {
    const res = fetch("http://localhost:4040/api/students/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        // Handle the response from the server
        console.log("Student list!!!", data);
      });
  };
  useEffect(() => {
    fetchList();
  }, []);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentStudents = students.slice(startIndex, endIndex);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleAddClose = () => setShowAddModal(false);
  const handleEditClose = () => setShowEditModal(false);

  const csvHeaders = [
    { label: "ID", key: "studId" },
    { label: "Name", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "Phone No.", key: "contactNo" },
    { label: "DOB", key: "dob" },
    { label: "Gender", key: "gender" },
  ];
  // const handleNavigation = (route) => {
  //   navigate(route);
  // };

  // const handleEditStudent = (editedStudent) => {
  //   console.log(editedStudent);
  //   // Update the student data in the list
  //   // You may want to perform more checks or validations here
  //   setStudents((prevStudents) =>
  //     prevStudents.map((student) =>
  //       student.studId === editedStudent.studId ? editedStudent : student
  //     )
  //   );
  //   setShowEditModal(false);
  // };

  const handleDelete = (studId) => {
    // Filter out the student with the specified ID
    // setStudents((prevStudents) =>
    //   prevStudents.filter((student) => student.studId !== studId)
    // );
    console.log("inside Handle delete");
    fetch("http://localhost:4040/api/students/del_studs", {
      method: "DELETE",
      // body: JSON.stringify(),
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // alert("Deleted");
        toast.success("Deleted successfully!!",  {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000, // Milliseconds
          hideProgressBar: true,
          className: "custom-success-toast",
        });
        //navigate("/dashboard");
        fetchList();
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
  };
  return (
    <div className="admin-body">
        <AdminNavbar />
      <div id="right-container">
        {students.length > 0 ? (
 
            <div className="div-flex-column">
              <div>
                <h4>List of Students</h4>
              </div>
              <div className="div-flex-row">
                 <div>
                <Button
                  variant="primary"
                  onClick={() => {                
                  setShowAddModal(true)}}> 
                  Add new
                </Button>
              </div>
              <div>
                {students.length > 0 ? (
                  <div className="export_btn">
                    <CSVLink
                      data={students}
                      headers={csvHeaders}
                      filename={"student_list.csv"}
                    >
                      <Button variant="primary">Export</Button>
                    </CSVLink>
                  </div>
                ) : (
                  ""
                )}
                </div>

              <div>
                <Pagination className="div-pagination">
                  {Array.from({
                    length: Math.ceil(students.length / studentsPerPage),
                  }).map((_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </div>
            </div>
            <div className="table-container">
            <Table striped bordered hover>
              <thead>
                <tr>
                <th style={{ width: '200px' }}>Student ID</th>
                  <th className="fixed-width">Name</th>
                  <th className="fixed-width">Email</th>
                  <th className="fixed-width">ContactNo</th>
                  <th style={{ width: '200px' }}>DateOfBirth</th>
                  <th>Gender</th>
                  <th>Course</th>
                  <th>Branch</th>
                  <th>Address</th>
                  <th>Education</th>
                  <th>PinCode</th>
                  <th>Religion</th>
                  <th>Occupation</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student.studId}>
                    <td>{student.studId}</td>
                    <td>{student.fullName}</td>
                    <td>{student.email}</td>
                    <td>{student.contactNo}</td>
                    <td>{moment(student.dob).format("DD-MM-yyyy")}</td>
                    <td>{student.gender}</td>
                    <td>{student.course}</td>
                    <td>{student.branch}</td>
                    <td>{student.resAddress}</td>
                    <td>{student.education}</td>
                    <td>{student.pinCode}</td>
                    <td>{student.religion}</td>
                    <td>{student.occupation}</td>
                    <td>{student.category}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => {
                          setSelectedStudent(student);
                          setShowEditModal(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(student.studId)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          </div>
        ) : (
          <h3>No Records Found</h3>
        )}
        <AddStudModal showModal={showAddModal} handleClose={handleAddClose} fetchList={fetchList} />
       {/* onAdd={handleAddStudent} /> */}

        {selectedStudent && (
          <EditStudent
            showModal={showEditModal}
            handleClose={handleEditClose}
            student={selectedStudent}
            // onEdit={handleEditStudent}
          />
        )}
      </div>
    </div>
  );
};

export default StudentList;
