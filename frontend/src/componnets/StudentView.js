import React, { useState, useEffect } from 'react';  
import { Table, Card } from 'react-bootstrap';  

const StudentView = () => {  
  const [classmates, setClassmates] = useState([]);  
  const [timetable, setTimetable] = useState([]);  
  const [studentProfile, setStudentProfile] = useState({});  

  useEffect(() => {  
    const fetchData = async () => {  
      try {  
        const profileResponse = await fetch('/api/student/profile');  
        const classmatesResponse = await fetch('/api/student/classmates');  
        const timetableResponse = await fetch('/api/student/timetable');  

        const profileData = await profileResponse.json();  
        const classmatesData = await classmatesResponse.json();  
        const timetableData = await timetableResponse.json();  

        setStudentProfile(profileData);  
        setClassmates(classmatesData);  
        setTimetable(timetableData);  
      } catch (error) {  
        console.error('Error fetching student data:', error);  
      }  
    };  

    fetchData();  
  }, []);  

  return (  
    <div className="container">  
      <h1>Welcome, {studentProfile.name}</h1>  

      <Card>  
        <Card.Header>Your Profile</Card.Header>  
        <Card.Body>  
          <Card.Text>  
            <strong>Name:</strong> {studentProfile.name}<br />  
            <strong>Email:</strong> {studentProfile.email}<br />  
            <strong>Class:</strong> {studentProfile.class}<br />  
          </Card.Text>  
        </Card.Body>  
      </Card>  

      <h2>Classmates</h2>  
      <Table striped bordered hover>  
        <thead>  
          <tr>  
            <th>Name</th>  
            <th>Email</th>  
          </tr>  
        </thead>  
        <tbody>  
          {classmates.map((classmate) => (  
            <tr key={classmate.id}>  
              <td>{classmate.name}</td>  
              <td>{classmate.email}</td>  
            </tr>  
          ))}  
        </tbody>  
      </Table>  

      <h2>Your Timetable</h2>  
      <Table striped bordered hover>  
        <thead>  
          <tr>  
            <th>Day</th>  
            <th>Time</th>  
            <th>Subject</th>  
            <th>Teacher</th>  
          </tr>  
        </thead>  
        <tbody>  
          {timetable.map((entry, index) => (  
            <tr key={index}>  
              <td>{entry.day}</td>  
              <td>{entry.time}</td>  
              <td>{entry.subject}</td>  
              <td>{entry.teacher}</td>  
            </tr>  
          ))}  
        </tbody>  
      </Table>  
    </div>  
  );  
};  

export default StudentView;