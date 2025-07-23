import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const [status, setStatus] = useState({ success: false, error: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setStatus({ success: false, error: 'Passwords do not match' });
      return;
    }

    if (!formData.agree) {
      setStatus({ success: false, error: 'Please agree to terms and conditions' });
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setStatus({ success: true, error: '' });
      setTimeout(() => navigate('/login'), 1500); // redirect to login
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setStatus({ success: false, error: errorMessage });
    }
  };

  return (
    <Container style={{ maxWidth: '500px', padding: '2rem' }}>
      <h2 className="mb-4 text-center">Register</h2>
      {status.success && <Alert variant="success">Registration successful! Redirecting to login...</Alert>}
      {status.error && <Alert variant="danger">{status.error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            name="name" 
            value={formData.name}
            required 
            onChange={handleChange} 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            name="email" 
            value={formData.email}
            required 
            onChange={handleChange} 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password" 
            value={formData.password}
            required 
            onChange={handleChange} 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type="password" 
            name="confirmPassword" 
            value={formData.confirmPassword}
            required 
            onChange={handleChange} 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            name="agree"
            checked={formData.agree}
            label="I agree to the Terms and Conditions"
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit" className="w-100">Register</Button>
      </Form>
      <div className="text-center mt-3">
        Already registered? <a href="/login">Login</a>
      </div>
    </Container>
  );
};

export default Register;