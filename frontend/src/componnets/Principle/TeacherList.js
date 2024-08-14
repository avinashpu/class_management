import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_URL } from '../../util';
import './TeacherList.css';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null); // To track which teacher is being deleted

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/teachers`);
        setTeachers(response.data.data);
      } catch (err) {
        console.error('Error fetching teachers:', err);
        setError('Failed to load teachers.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleDelete = async (teacher) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setDeletingId(teacher._id); // Set deleting ID to show spinner
      try {
        await axios.delete(`${API_URL}/api/auth/teachers/${teacher._id}`);
        setTeachers((prevTeachers) => prevTeachers.filter(t => t._id !== teacher._id)); // Remove teacher from list
        setDeletingId(null); // Reset deleting ID
      } catch (err) {
        console.error('Error deleting teacher:', err);
        setError('Failed to delete teacher.');
        setDeletingId(null); // Reset deleting ID
      }
    }
  };

  if (loading) {
    return (
      <div className="teacher-list-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="teacher-list-page">
      <h1>Teacher List</h1>
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
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>
                  <Link to={`/edit-teacher/${teacher._id}`} state={{ selectedTeacher: teacher }}>
                    <Button variant="warning" className="me-2">Edit</Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(teacher)}
                    disabled={deletingId === teacher._id}
                  >
                    {deletingId === teacher._id ? 'Deleting...' : 'Remove'}
                  </Button>
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
