import React, { useEffect, useState } from "react";
import { Table, Pagination, Button, Modal, Form } from "react-bootstrap";
import EditLeader from "./EditLeaderModal";
import AddLeaderModal from "./AddLeaderModal";
import "../Leaders/LeaderRegistration.css";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import AdminNavbar from "../AdminNavbar";
import { toast } from "react-toastify";

const LeaderList = () => {
  const LeadersPerPage = 5;
  let navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const [Leaders, setLeaders] = useState([]);

  const token = localStorage.getItem("token");
  const fetchList = () => {
    const res = fetch("http://localhost:4040/api/leaders/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLeaders(data);
        // Handle the response from the server
        console.log("Leader list!!!", data);
      });
  };
  useEffect(() => {
    fetchList();
  }, []);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * LeadersPerPage;
  const endIndex = startIndex + LeadersPerPage;
  const currentLeaders = Leaders.slice(startIndex, endIndex);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState(null);

  const handleAddClose = () => setShowAddModal(false);
  const handleEditClose = () => setShowEditModal(false);

  const csvHeaders = [
    { label: "ID", key: "leader_id" },
    { label: "Name", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "Phone No.", key: "phone_number" },
  ];
  // const handleNavigation = (route) => {
  //   navigate(route);
  // };

  // const handleEditLeader = (editedLeader) => {
  //   console.log(editedLeader);
  //   // Update the Leader data in the list
  //   // You may want to perform more checks or validations here
  //   setLeaders((prevLeaders) =>
  //     prevLeaders.map((Leader) =>
  //       Leader.leader_id === editedLeader.leader_id ? editedLeader : Leader
  //     )
  //   );
  //   setShowEditModal(false);
  // };

  const handleDelete = (leader_id) => {
    // Filter out the Leader with the specified ID
    // setLeaders((prevLeaders) =>
    //   prevLeaders.filter((Leader) => Leader.leader_id !== leader_id)
    // );
    console.log("inside Handle delete");
    fetch("http://localhost:4040/api/leaders/del_leaders", {
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
        toast.success("Deleted successfully!!", {
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
        {Leaders.length > 0 ? (
          <div className="div-flex-column">
            <div>
              <h4>List of Leaders</h4>
            </div>
            <div className="div-flex-row">
              <div>
                <Button
                  variant="primary"
                  onClick={() => {
                    setShowAddModal(true);
                  }}
                >
                  Add new
                </Button>
              </div>
              <div>
                {Leaders.length > 0 ? (
                  <div className="export_btn">
                    <CSVLink
                      data={Leaders}
                      headers={csvHeaders}
                      filename={"Leader_list.csv"}
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
                    length: Math.ceil(Leaders.length / LeadersPerPage),
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
                    <th style={{ width: "200px" }}>Leader ID</th>
                    <th className="fixed-width">Name</th>
                    <th className="fixed-width">Email</th>
                    <th className="fixed-width">ContactNo</th>
                    <th style={{ width: "200px" }}>PromoCode</th>
                    <th>Balance Amount</th>
                    <th>Total Earnings</th>
                    <th>Type</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLeaders.map((Leader) => (
                    <tr key={Leader.leader_id}>
                      <td>{Leader.leader_id}</td>
                      <td>{Leader.fullName}</td>
                      <td>{Leader.email}</td>
                      <td>{Leader.phone_number}</td>
                      <td>{Leader.promoCode}</td>
                      <td>{Leader.balance}</td>
                      <td>{Leader.total_earnings}</td>
                      <td>{Leader.type}</td>
                      <td>{Leader.address}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => {
                            setSelectedLeader(Leader);
                            setShowEditModal(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(Leader.leader_id)}
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
        <AddLeaderModal
          showModal={showAddModal}
          handleClose={handleAddClose}
          fetchList={fetchList}
        />
        {/* onAdd={handleAddLeader} /> */}

        {selectedLeader && (
          <EditLeader
            showModal={showEditModal}
            handleClose={handleEditClose}
            Leader={selectedLeader}
            // onEdit={handleEditLeader}
          />
        )}
      </div>
    </div>
  );
};

export default LeaderList;
