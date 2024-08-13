import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_URL } from '../../util';
import './TeacherList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/students`);
        setStudents(response.data.data); 
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
    try {
      await axios.delete(`${API_URL}/api/auth/students/${student._id}`);
      const response = await axios.get(`${API_URL}/api/auth/students`);
      setStudents(response.data.data); 
    } catch (err) {
      console.error('Error deleting student:', err);
      setError('Failed to delete student.');
    }
  };

  if (loading) {
    return <div className="student-list-container">Loading...</div>;
  }

  if (error) {
    return <div className="student-list-container error-message">{error}</div>;
  }

  return (
    <div className="student-list-page">
      <h1>Student List</h1>
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
                  <Link to={`/edit-student`} state={{ selectedStudent: student }}>
                    <Button variant="warning" className="me-2">Edit</Button>
                  </Link>
                  <Button variant="danger" onClick={() => handleDelete(student)}>Remove</Button>
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
