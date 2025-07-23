import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Modal, Badge } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaUndo, FaSearch, FaFilter } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editTask, setEditTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [status, setStatus] = useState({ success: '', error: '' });
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, pending
  const navigate = useNavigate();

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/todos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setStatus({ success: '', error: 'Failed to fetch todos' });
      setLoading(false);
      
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setAdding(true);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:5000/api/todos', 
        { task: newTask.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStatus({ success: 'Todo added successfully!', error: '' });
      setNewTask('');
      fetchTodos(); // Refresh the list
      
      // Clear success message after 3 seconds
      setTimeout(() => setStatus({ success: '', error: '' }), 3000);
    } catch (error) {
      console.error('Error adding todo:', error);
      setStatus({ success: '', error: error.response?.data?.message || 'Failed to add todo' });
    } finally {
      setAdding(false);
    }
  };

  const updateTodo = async (id, updates) => {
    const token = localStorage.getItem('token');

    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setStatus({ success: 'Todo updated successfully!', error: '' });
      fetchTodos(); // Refresh the list
      
      // Clear success message after 3 seconds
      setTimeout(() => setStatus({ success: '', error: '' }), 3000);
    } catch (error) {
      console.error('Error updating todo:', error);
      setStatus({ success: '', error: error.response?.data?.message || 'Failed to update todo' });
    }
  };

  const deleteTodo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;

    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setStatus({ success: 'Todo deleted successfully!', error: '' });
      fetchTodos(); // Refresh the list
      
      // Clear success message after 3 seconds
      setTimeout(() => setStatus({ success: '', error: '' }), 3000);
    } catch (error) {
      console.error('Error deleting todo:', error);
      setStatus({ success: '', error: error.response?.data?.message || 'Failed to delete todo' });
    }
  };

  const toggleComplete = async (todo) => {
    await updateTodo(todo._id, { task: todo.task, done: !todo.done });
  };

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditTask(todo.task);
    setShowModal(true);
  };

  const saveEdit = async () => {
    if (!editTask.trim()) return;
    
    await updateTodo(editingTodo, { task: editTask.trim(), done: todos.find(t => t._id === editingTodo)?.done });
    setEditingTodo(null);
    setEditTask('');
    setShowModal(false);
  };

  const cancelEdit = () => {
    setEditingTodo(null);
    setEditTask('');
    setShowModal(false);
  };

  // Filter todos based on search term and filter type
  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.task.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'completed' && todo.done) || 
                         (filter === 'pending' && !todo.done);
    return matchesSearch && matchesFilter;
  });

  const completedCount = todos.filter(todo => todo.done).length;
  const pendingCount = todos.filter(todo => !todo.done).length;

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading your todos...</p>
      </Container>
    );
  }

  return (
    <Container style={{ maxWidth: '800px', padding: '2rem' }}>
      <Row className="mb-4">
        <Col>
          <h2 className="text-center mb-3">My Todo List</h2>
          <div className="d-flex justify-content-center gap-3 mb-3">
            <Badge bg="primary">Total: {todos.length}</Badge>
            <Badge bg="success">Completed: {completedCount}</Badge>
            <Badge bg="warning">Pending: {pendingCount}</Badge>
          </div>
        </Col>
      </Row>

      {/* Status Messages */}
      {status.success && <Alert variant="success">{status.success}</Alert>}
      {status.error && <Alert variant="danger">{status.error}</Alert>}

      {/* Add Todo Form */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Form onSubmit={addTodo}>
            <Row className="align-items-end">
              <Col md={10}>
                <Form.Group>
                  <Form.Label>Add New Todo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    disabled={adding}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Button 
                  type="submit" 
                  className="w-100" 
                  disabled={adding || !newTask.trim()}
                >
                  {adding ? <Spinner animation="border" size="sm" /> : <FaPlus />}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Search and Filter */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row>
            <Col md={8}>
              <Form.Group>
                <Form.Label>Search Todos</Form.Label>
                <div className="position-relative">
                  <FaSearch className="position-absolute" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                  <Form.Control
                    type="text"
                    placeholder="Search your todos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ paddingLeft: '35px' }}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Filter</Form.Label>
                <Form.Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="all">All Todos</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Todo List */}
      {filteredTodos.length === 0 ? (
        <Card className="text-center py-5 shadow-sm">
          <Card.Body>
            <h5 className="text-muted">
              {searchTerm || filter !== 'all' ? 'No todos match your search/filter' : 'No todos yet'}
            </h5>
            <p className="text-muted">
              {searchTerm || filter !== 'all' ? 'Try adjusting your search or filter' : 'Add your first todo above!'}
            </p>
          </Card.Body>
        </Card>
      ) : (
        <div className="todo-list">
          {filteredTodos.map((todo) => (
            <Card key={todo._id} className="mb-3 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center">
                      <Form.Check
                        type="checkbox"
                        checked={todo.done}
                        onChange={() => toggleComplete(todo)}
                        className="me-3"
                      />
                      <span 
                        className={`${todo.done ? 'text-decoration-line-through text-muted' : ''}`}
                        style={{ fontSize: '1.1rem' }}
                      >
                        {todo.task}
                      </span>
                      {todo.done && <Badge bg="success" className="ms-2">Done</Badge>}
                    </div>
                    <small className="text-muted">
                      Created: {new Date(todo.createdAt).toLocaleDateString()}
                      {todo.updatedAt && (
                        <span> • Updated: {new Date(todo.updatedAt).toLocaleDateString()}</span>
                      )}
                    </small>
                  </div>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => startEditing(todo)}
                      title="Edit todo"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => toggleComplete(todo)}
                      title={todo.done ? "Mark as pending" : "Mark as completed"}
                    >
                      {todo.done ? <FaUndo /> : <FaCheck />}
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteTodo(todo._id)}
                      title="Delete todo"
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Modal show={showModal} onHide={cancelEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
                placeholder="Enter task..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelEdit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveEdit} disabled={!editTask.trim()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Todo;