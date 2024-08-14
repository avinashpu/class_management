import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_URL } from '../../util';
import './TeacherList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Ensure the URL is correctly formatted
        const url = `${API_URL}/api/auth/students`;
        console.log('Fetching students from:', url); // Debug log

        const response = await axios.get(url);
        console.log('Fetched students:', response.data); // Debug log
        setStudents(response.data.data); // Adjust this based on your API response
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to load students.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (student) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setDeletingId(student._id);
      try {
        await axios.delete(`${API_URL}/api/auth/students/${student._id}`);
        setStudents((prevStudents) => prevStudents.filter(s => s._id !== student._id));
        setDeletingId(null);
      } catch (err) {
        console.error('Error deleting student:', err);
        setError('Failed to delete student.');
        setDeletingId(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="student-list-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="student-list-page">
      <h1>Student List</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <Link to={`/edit-student/${student._id}`} state={{ selectedStudent: student }}>
                    <Button variant="warning" className="me-2">Edit</Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(student)}
                    disabled={deletingId === student._id}
                  >
                    {deletingId === student._id ? 'Deleting...' : 'Remove'}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No students found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentList;
