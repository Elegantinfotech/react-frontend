import React from 'react';
import { Table, Pagination } from 'react-bootstrap';

const StudentTable = () => {
  // Assuming you have the list of students
  const students = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Mike Johnson" },
    // Add more students as needed
    // For demonstration purposes, let's add more students to make pagination visible
    { id: 4, name: "Emily Adams" },
    { id: 5, name: "Michael Brown" },
    { id: 6, name: "Sophia Clark" },
    { id: 7, name: "William Davis" },
    { id: 8, name: "Olivia Evans" },
    { id: 9, name: "James Green" },
    { id: 10, name: "Amelia Hall" },
    { id: 11, name: "Benjamin Jackson" },
  ];

  // Items per page
  const itemsPerPage = 5;

  // Current page state
  const [currentPage, setCurrentPage] = React.useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(students.length / itemsPerPage);

  // Get the current page's students
  const indexOfLastStudent = currentPage * itemsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  // Handle pagination click
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>List of Students</h1>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default StudentTable;
