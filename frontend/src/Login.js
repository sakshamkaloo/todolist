import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const [status, setStatus] = useState({ success: false, error: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        email: formData.email,
        password: formData.password,
      });

      setStatus({ success: true, error: '' });

      // Store token in localStorage
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify({ name: res.data.name, email: formData.email }));
      }

      setTimeout(() => navigate('/profile'), 1000); // redirect to profile
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setStatus({ success: false, error: errorMessage });
    }
  };

  return (
    <Container style={{ maxWidth: '500px', padding: '2rem' }}>
      <h2 className="mb-4 text-center">Login</h2>
      {status.success && <Alert variant="success">Login successful! Redirecting...</Alert>}
      {status.error && <Alert variant="danger">{status.error}</Alert>}
      <Form onSubmit={handleSubmit}>
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
          <Form.Check
            type="checkbox"
            name="remember"
            checked={formData.remember}
            label="Remember me"
            onChange={handleChange}
          />
        </Form.Group>
        <div className="mb-3 text-end">
          <a href="#forgot-password">Forgot Password?</a>
        </div>
        <Button type="submit" className="w-100">Login</Button>
      </Form>
      <div className="text-center mt-3">
        Don't have an account? <a href="/register">Register here</a>
      </div>
    </Container>
  );
};

export default Login;