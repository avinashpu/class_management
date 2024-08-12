// src/pages/LoginPage.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000'; // Update with your API URL

const LoginPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, values);

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.user.role);

        alert('Login successful');
        resetForm();

        if (response.data.user.role === 'Principal') {
          navigate('/dashboard/principal');
        } else if (response.data.user.role === 'Teacher') {
          navigate('/dashboard/teacher');
        } else if (response.data.user.role === 'Student') {
          navigate('/dashboard/student');
        }
      } else {
        alert(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <button type="submit" className="submit-button">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
