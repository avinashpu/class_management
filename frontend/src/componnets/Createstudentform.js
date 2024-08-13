import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './CreateStudentForm.css'; 
import { API_URL } from '../util';
const CreateStudentForm = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    role: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    role: Yup.string().required('Role is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`);
      console.log('Student created successfully:', response.data);
      setStatus({ success: 'Student created successfully!' });
    } catch (error) {
      console.error('Error creating student:', error);
      setStatus({ error: 'Failed to create student. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="create-student-form-container">
      <h1>Create Student</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <Field as="select" id="role" name="role">
                <option value="" label="Select role" />
                <option value="student" label="Student" />
                <option value="teacher" label="Teacher" />
                {/* Add more roles if needed */}
              </Field>
              <ErrorMessage name="role" component="div" className="error-message" />
            </div>

            <button type="submit" disabled={isSubmitting}>Create Student</button>
            {status && status.success && <p className="success-message">{status.success}</p>}
            {status && status.error && <p className="error-message">{status.error}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateStudentForm;
