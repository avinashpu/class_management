import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../config/axiosInstance';
import { API_URL } from '../util';
import './UpdateUserForm.css';

const UpdateUserForm = ({ userId, initialValues = { email: '', name: '', role: 'Student' } }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the user details by ID to prefill the form
        const fetchUserDetails = async () => {
            try {
                const response = await axiosInstance.get(`${API_URL}/api/users/${userId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                formik.setValues({
                    email: response.data.email || '',
                    name: response.data.name || '',
                    role: response.data.role || 'Student',
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user details:', error);
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userId]);

    const formik = useFormik({
        initialValues: {
            email: initialValues.email,
            password: '',
            name: initialValues.name,
            role: initialValues.role,
        },
        enableReinitialize: true, // Reinitialize form when initialValues change
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters'),
            name: Yup.string().required('Required'),
            role: Yup.string().oneOf(['Teacher', 'Student']).required('Required'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await axiosInstance.put(`${API_URL}/api/auth/users/${userId}`, values, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                alert('User updated successfully!');
            } catch (error) {
                console.error('Update Error:', error);
                setErrors({ api: error.response?.data?.message || 'Failed to update user' });
            } finally {
                setSubmitting(false);
            }
        },
    });

    if (loading) return <p>Loading...</p>;

    return (
        <div className="update-form-container">
            <h1>Update {formik.values.role}</h1>
            <div className="form-container">
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? <div className="error-message">{formik.errors.email}</div> : null}
                    
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? <div className="error-message">{formik.errors.password}</div> : null}

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? <div className="error-message">{formik.errors.name}</div> : null}

                    <select
                        name="role"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="Teacher">Teacher</option>
                        <option value="Student">Student</option>
                    </select>
                    {formik.touched.role && formik.errors.role ? <div className="error-message">{formik.errors.role}</div> : null}

                    {formik.errors.api ? <div className="error-message">{formik.errors.api}</div> : null}
                    
                    <button type="submit" disabled={formik.isSubmitting}>Update User</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateUserForm;
