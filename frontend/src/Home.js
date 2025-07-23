// Home.js

import React from 'react';
import { Carousel, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import {
  FaUserLock,
  FaTasks,
  FaMobileAlt,
  FaCloudUploadAlt,
  FaCheckCircle
} from 'react-icons/fa';


const Home = () => {
const isLoggedIn = false; // TEMPORARY — replace with actual auth logic later

    return (
    <div>

      {/* Hero Carousel Section */}
<Carousel fade>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://placehold.co/1200x400/aqua/blue?text=Organize+Your+Day"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>Organize Your Day</h3>
      <p>Stay productive by managing your daily tasks efficiently.</p>
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://placehold.co/1200x400/aqua/blue?text=Secure+and+Personalized"
      alt="Second slide"
    />
    <Carousel.Caption>
      <h3>Secure and Personalized</h3>
      <p>Your to-dos are private and accessible only to you.</p>
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://placehold.co/1200x400/aqua/blue?text=Simple+and+Fast"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Simple & Fast</h3>
      <p>Minimal design with quick add, update, and delete operations.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

      {/* Home Content */}
      <section className="text-center py-5 bg-light">
        <Container>
          <h1>Welcome to ToDoApp</h1>
          <p className="lead">Manage your daily tasks with ease.</p>
          {!isLoggedIn && <Button variant="primary" href="#register">Get Started</Button>}
        </Container>
      </section>


{/* About Project Section */}
<section id="about" className="py-5 bg-light">
  <Container>
    <h2 className="text-center mb-4">About This Project</h2>
    <p className="lead text-center">
      ToDoApp is a simple and effective task management system built with the MERN stack.
      It allows users to create, update, and delete tasks after securely logging in.
    </p>
    <p className="text-center">
      Whether you're a student managing assignments, a professional tracking work goals, 
      or just someone organizing your day-to-day tasks, this app is designed to keep you 
      focused and productive.
    </p>
  </Container>
</section>


{/* Developer Section */}
<section id="developer" className="py-5">
  <Container>
    <h2 className="text-center mb-4">About the Developer</h2>
    <div className="row align-items-center">
      <div className="col-md-4 text-center mb-3">
        <img
          src="https://via.placeholder.com/200"
          alt="Developer"
          className="img-fluid rounded-circle border border-3"
        />
      </div>
      <div className="col-md-8">
        <p className="lead">
          Hi, I'm <strong>Saksham Kaloo</strong>, a passionate MERN stack developer dedicated to building
          user-friendly and efficient web applications. I built this project to demonstrate core full-stack skills
          like authentication, CRUD operations, and responsive design—all while keeping code clean and minimal.
        </p>
        <p>
          Feel free to connect with me via the Contact section below. I’m open to feedback, collaboration,
          and career opportunities!
        </p>
      </div>
    </div>
  </Container>
</section>


{/* User Feedback Section */}
<section id="feedback" className="py-5 bg-light">
  <Container>
    <h2 className="text-center mb-4">What Our Users Say</h2>
    <div className="row">
      <div className="col-md-4 mb-3">
        <div className="card h-100 shadow">
          <div className="card-body">
            <p className="card-text">
              “This app keeps me on track every day. Simple and very effective!”
            </p>
            <h5 className="card-title">– Alex, Student</h5>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="card h-100 shadow">
          <div className="card-body">
            <p className="card-text">
              “A clean interface with all the necessary features. Great job!”
            </p>
            <h5 className="card-title">– Priya, Developer</h5>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="card h-100 shadow">
          <div className="card-body">
            <p className="card-text">
              “Finally a to-do app that’s fast and easy to use. Love it!”
            </p>
            <h5 className="card-title"> Rahul, Freelancer</h5>
          </div>
        </div>
      </div>
    </div>
  </Container>
</section>

{/* Features Section */}
<section id="features" className="py-5">
  <Container>
    <h2 className="text-center mb-4">Key Features</h2>
    <div className="row text-center">
      <div className="col-md-4 mb-4">
        <FaUserLock size={40} className="text-primary mb-2" />
        <h5>Secure Login</h5>
        <p>Your data is protected with user-based authentication.</p>
      </div>
      <div className="col-md-4 mb-4">
        <FaTasks size={40} className="text-success mb-2" />
        <h5>Task Management</h5>
        <p>Easily create, edit, and delete your personal tasks.</p>
      </div>
      <div className="col-md-4 mb-4">
        <FaMobileAlt size={40} className="text-warning mb-2" />
        <h5>Responsive Design</h5>
        <p>Works perfectly on desktop and mobile devices.</p>
      </div>
      <div className="col-md-4 mb-4">
        <FaCloudUploadAlt size={40} className="text-info mb-2" />
        <h5>Real-Time Storage</h5>
        <p>Your tasks are saved in MongoDB and synced in real-time.</p>
      </div>
      <div className="col-md-4 mb-4">
        <FaCheckCircle size={40} className="text-danger mb-2" />
        <h5>Simple UI</h5>
        <p>Clean interface with intuitive navigation and controls.</p>
      </div>
    </div>
  </Container>
</section>

{/* Contact Section */}
<section id="contact" className="py-5 bg-light">
  <Container>
    <h2 className="text-center mb-4">Get in Touch</h2>
    <div className="row">
      <div className="col-md-6 mb-4">
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Your Name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Your Email" />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" rows="4" placeholder="Your Message"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>
      <div className="col-md-6">
        <h5>Developer Contact</h5>
        <p><strong>Email:</strong> myemail@example.com</p>
        <p><strong>GitHub:</strong> <a href="https://github.com/sakshamkaloo" target="_blank" rel="noreferrer">mygithubprofile</a></p>
        <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/saksham-kaloo-0b8768227/" target="_blank" rel="noreferrer">mylinkedinprofile</a></p>
        <p>Feel free to reach out for feedback, collaboration, or job opportunities!</p>
      </div>
    </div>
  </Container>
</section>

{/* Footer Section */}
<footer className="bg-dark text-white mt-5 pt-4 pb-2">
  <Container>
    <div className="row text-center text-md-start">
      <div className="col-md-6 mb-3 mb-md-0">
        <h5>ToDoApp</h5>
        <p>&copy; {new Date().getFullYear()} ToDoApp. All rights reserved.</p>
      </div>
      <div className="col-md-6">
        <h6>Quick Links</h6>
        <ul className="list-unstyled d-flex flex-column flex-md-row gap-3 justify-content-md-end">
          <li><a href="#" className="text-white text-decoration-none">Home</a></li>
          <li><a href="#about" className="text-white text-decoration-none">About</a></li>
          <li><a href="#developer" className="text-white text-decoration-none">Developer</a></li>
          <li><a href="#feedback" className="text-white text-decoration-none">Feedback</a></li>
          <li><a href="#features" className="text-white text-decoration-none">Features</a></li>
          <li><a href="#contact" className="text-white text-decoration-none">Contact</a></li>
        </ul>
      </div>
    </div>
  </Container>
</footer>
</div>
  );
};

export default Home;
