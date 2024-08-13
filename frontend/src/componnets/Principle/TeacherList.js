import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_URL } from '../../util';
import './TeacherList.css';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/teachers`);
        setTeachers(response.data.data); // Accessing data array from response
      } catch (err) {
        console.error('Error fetching teachers:', err);
        setError('Failed to load teachers.');
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchTeachers();
  }, []);

  const handleDelete = async (teacher) => {
    try {
      await axios.delete(`${API_URL}/api/auth/teachers/${teacher._id}`);
      const response = await axios.get(`${API_URL}/api/auth/teachers`);
      setTeachers(response.data.data); // Update the list after deletion
    } catch (err) {
      console.error('Error deleting teacher:', err);
      setError('Failed to delete teacher.');
    }
  };

  if (loading) {
    return <div className="teacher-list-container">Loading...</div>;
  }

  if (error) {
    return <div className="teacher-list-container error-message">{error}</div>;
  }

  return (
    <div className="teacher-list-page">
      <h1>Teacher List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>
                  <Link to={`/edit-teacher`} state={{ selectedTeacher: teacher }}>
                    <Button variant="warning" className="me-2">Edit</Button>
                  </Link>
                  <Button variant="danger" onClick={() => handleDelete(teacher)}>Remove</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No teachers found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TeacherList;
