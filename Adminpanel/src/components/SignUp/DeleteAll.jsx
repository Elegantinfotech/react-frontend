import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const DeleteAll = ({ showModal, handleClose }) => {
  const [, setNewStudent] = useState({ id: '', name: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,    
    }));
  };

//   const handleSubmit = () => {
//     // Validate and add the new student to the list
//     // For simplicity, let's assume the ID is unique
//     // You can implement more robust validation and checks here
//     setNewStudent({ id: '', name: '' });
//     handleClose();
//   };
  const handleSubmit = () => {
    // Filter out the student with the specified ID
   // setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
  };
  return (
    // <Modal show={showModal} onHide={handleClose}>
    //   <Modal.Header closeButton>
    //     <Modal.Title>Delete Users</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <Form>
    //       <Form.Group controlId="formUserID">
    //         <Form.Label>User ID</Form.Label>
    //         <Form.Control
    //           type="text"
    //           name="id"
    //           value={newStudent.id}
    //           onChange={handleInputChange}
    //         />
    //       </Form.Group>
    //       <Form.Group controlId="formStudentName">
    //         <Form.Label>Student Name</Form.Label>
    //         <Form.Control
    //           type="text"
    //           name="name"
    //           value={newStudent.name}
    //           onChange={handleInputChange}
    //         />
    //       </Form.Group>
    //     </Form>
    //   </Modal.Body>
    //   <Modal.Footer>
    //     <Button variant="secondary" onClick={handleClose}>
    //       Cancel
    //     </Button>
    //     <Button variant="primary" onClick={handleSubmit}>
    //       Save
    //     </Button>
    //   </Modal.Footer>
    // </Modal>
    <div></div>
  );
};

export default DeleteAll;
