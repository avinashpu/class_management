import React, { useEffect, useState } from 'react';  
import { Card, Table } from 'react-bootstrap';  

const PrincipalView = () => {  
  const [teacherList, setTeacherList] = useState([]);  

  useEffect(() => {  
    // Fetch teacher data from the API  
    const fetchData = async () => {  
      try {  
        const response = await fetch('/api/principal/teachers');  
        const data = await response.json();  
        setTeacherList(data);  
      } catch (error) {  
        console.error('Error fetching teacher data:', error);  
      }  
    };  

    fetchData();  
  }, []);  

  return (  
    <div className="container">  
      <h1>Welcome, Principal</h1>  
      <Card>  
        <Card.Header>Teachers List</Card.Header>  
        <Card.Body>  
          <Table striped bordered hover>  
            <thead>  
              <tr>  
                <th>Name</th>  
                <th>Email</th>  
                <th>Classes Assigned</th>  
              </tr>  
            </thead>  
            <tbody>  
              {teacherList.map((teacher) => (  
                <tr key={teacher.id}>  
                  <td>{teacher.name}</td>  
                  <td>{teacher.email}</td>  
                  <td>{teacher.classes.join(", ")}</td>  
                </tr>  
              ))}  
            </tbody>  
          </Table>  
        </Card.Body>  
      </Card>  
    </div>  
  );  
};  

export default PrincipalView;