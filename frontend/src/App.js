import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Principlelogin from './pages/Principlelogin';
import Dashboard from './pages/Dashboard';
import Studentlogin from "./pages/Studentlogin";
import Teacherlogin from "./pages/Teacherlogin";
import Principlesidebar from './componnets/Principle/Principlesidebar';
import Teachersidebar from './componnets/Teacher/Teachersidebar';
import Studentsidebar from './componnets/Student/Studentsidebar';
import CreateStudentForm from './componnets/Createstudentform';
import TeacherList from './componnets/Principle/TeacherList';
import StudentList from './componnets/Principle/StudentList';
import ClassroomForm from './componnets/Principle/ClassroomForm';
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Dashboard />} />
        <Route path="/principlelogin" element={< Principlelogin/>} />
        <Route path="/studentlogin" element={<Studentlogin />} />
        <Route path="/teacherlogin" element={<Teacherlogin />} />
        <Route path="/principlesidebar" element={< Principlesidebar />} />
        <Route path="/teachersidebar" element={< Teachersidebar />} />
        <Route path="/studentsidebar" element={< Studentsidebar />} />
        <Route path="/createstudentform" element={< CreateStudentForm />} />
        <Route path="/teacherlist" element={< TeacherList />} />
        <Route path="/studentlist" element={< StudentList />} />
        <Route path="/createclassroom" element={< ClassroomForm />} />
      </Routes>
    </Router>
  );
};

export default App;
