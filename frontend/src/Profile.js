import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Spinner, Alert, Modal, Form, Row, Col, Badge } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaCalendar, FaEdit, FaCamera, FaSave, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: '', success: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({ name: '', email: '', profileImage: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data);
      setEditData({
        name: res.data.name || '',
        email: res.data.email || '',
        profileImage: res.data.profileImage || ''
      });
      setStatus({ loading: false, error: '', success: '' });
    } catch (err) {
      console.error('Profile fetch error:', err);
      setStatus({ loading: false, error: 'Unauthorized or server error', success: '' });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  const fetchTodoStats = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.get('http://localhost:5000/api/todos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todo stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setStatus({ ...status, error: 'Image size should be less than 5MB' });
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    
    const token = localStorage.getItem('token');
    
    try {
      let profileImageData = editData.profileImage;
      
      // If user selected a new image, convert to base64
      if (imageFile) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          profileImageData = e.target.result;
          
          const updateData = {
            name: editData.name,
            email: editData.email,
            profileImage: profileImageData
          };
          
          await axios.put('http://localhost:5000/api/profile', updateData, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          setStatus({ loading: false, error: '', success: 'Profile updated successfully!' });
          setShowEditModal(false);
          setImageFile(null);
          setImagePreview(null);
          fetchProfile();
          
          // Update localStorage user data
          const userData = JSON.parse(localStorage.getItem('user') || '{}');
          userData.name = editData.name;
          localStorage.setItem('user', JSON.stringify(userData));
          
          setTimeout(() => setStatus({ ...status, success: '' }), 3000);
        };
        reader.readAsDataURL(imageFile);
      } else {
        // Update without image change
        const updateData = {
          name: editData.name,
          email: editData.email,
          profileImage: profileImageData
        };
        
        await axios.put('http://localhost:5000/api/profile', updateData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setStatus({ loading: false, error: '', success: 'Profile updated successfully!' });
        setShowEditModal(false);
        fetchProfile();
        
        // Update localStorage user data
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        userData.name = editData.name;
        localStorage.setItem('user', JSON.stringify(userData));
        
        setTimeout(() => setStatus({ ...status, success: '' }), 3000);
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setStatus({ loading: false, error: error.response?.data?.message || 'Failed to update profile', success: '' });
    } finally {
      setUpdating(false);
    }
  };

  const openEditModal = () => {
    setEditData({
      name: user?.name || '',
      email: user?.email || '',
      profileImage: user?.profileImage || ''
    });
    setImagePreview(user?.profileImage || null);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setImageFile(null);
    setImagePreview(null);
    setEditData({ name: '', email: '', profileImage: '' });
  };

  useEffect(() => {
    fetchProfile();
    fetchTodoStats();
  }, []);

  if (status.loading) {
    return (
      <Container className="text-center p-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading profile...</p>
      </Container>
    );
  }

  if (status.error && !user) {
    return (
      <Container className="p-5">
        <Alert variant="danger">{status.error}</Alert>
      </Container>
    );
  }

  const completedTodos = todos.filter(todo => todo.done).length;
  const pendingTodos = todos.filter(todo => !todo.done).length;

  return (
    <Container style={{ maxWidth: '800px', padding: '2rem' }}>
      {/* Status Messages */}
      {status.success && <Alert variant="success">{status.success}</Alert>}
      {status.error && <Alert variant="danger">{status.error}</Alert>}

      {/* Profile Card */}
      <Card className="shadow-lg mb-4">
        <Card.Body className="text-center">
          <div className="position-relative d-inline-block mb-3">
            <img
              src={user?.profileImage || 'https://via.placeholder.com/150/007bff/white?text=User'}
              alt="Profile"
              className="rounded-circle img-fluid border border-3 border-primary"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            <Button
              variant="primary"
              size="sm"
              className="position-absolute bottom-0 end-0 rounded-circle"
              onClick={openEditModal}
              style={{ width: '40px', height: '40px' }}
            >
              <FaCamera />
            </Button>
          </div>
          
          <h3 className="mb-2">{user?.name || 'User'}</h3>
          <p className="text-muted mb-3">
            <FaEnvelope className="me-2" />
            {user?.email}
          </p>
          <p className="text-muted mb-3">
            <FaCalendar className="me-2" />
            Member since: {new Date(user?.createdAt).toLocaleDateString()}
          </p>
          <p className="text-muted mb-4">
            <FaUser className="me-2" />
            User ID: {user?._id}
          </p>
          
          <div className="d-flex gap-2 justify-content-center">
            <Button variant="primary" onClick={openEditModal}>
              <FaEdit className="me-2" />
              Edit Profile
            </Button>
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h4 className="text-primary">{todos.length}</h4>
              <p className="text-muted mb-0">Total Todos</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h4 className="text-success">{completedTodos}</h4>
              <p className="text-muted mb-0">Completed</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h4 className="text-warning">{pendingTodos}</h4>
              <p className="text-muted mb-0">Pending</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Card className="shadow-sm">
        <Card.Header>
          <h5 className="mb-0">Recent Activity</h5>
        </Card.Header>
        <Card.Body>
          {todos.length === 0 ? (
            <p className="text-muted text-center">No todos yet. Start by adding your first todo!</p>
          ) : (
            <div>
              {todos.slice(0, 5).map(todo => (
                <div key={todo._id} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                  <div className="d-flex align-items-center">
                    <Badge bg={todo.done ? 'success' : 'warning'} className="me-2">
                      {todo.done ? 'Done' : 'Pending'}
                    </Badge>
                    <span className={todo.done ? 'text-decoration-line-through text-muted' : ''}>
                      {todo.task}
                    </span>
                  </div>
                  <small className="text-muted">
                    {new Date(todo.createdAt).toLocaleDateString()}
                  </small>
                </div>
              ))}
              {todos.length > 5 && (
                <div className="text-center mt-3">
                  <Button variant="outline-primary" onClick={() => navigate('/todo')}>
                    View All Todos
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={closeEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleProfileUpdate}>
          <Modal.Body>
            <Row>
              <Col md={4} className="text-center">
                <div className="mb-3">
                  <img
                    src={imagePreview || editData.profileImage || 'https://via.placeholder.com/150/007bff/white?text=User'}
                    alt="Profile Preview"
                    className="rounded-circle img-fluid border border-3 border-primary"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                </div>
                <Form.Group className="mb-3">
                  <Form.Label>Profile Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <Form.Text className="text-muted">
                    Max file size: 5MB. Supported formats: JPG, PNG, GIF
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEditModal}>
              <FaTimes className="me-2" />
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={updating}>
              {updating ? (
                <Spinner animation="border" size="sm" className="me-2" />
              ) : (
                <FaSave className="me-2" />
              )}
              {updating ? 'Updating...' : 'Save Changes'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Profile;