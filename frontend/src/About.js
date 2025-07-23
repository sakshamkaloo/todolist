// About.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';


const About = () => {
  return (
    <>
      {/* Page Header */}
      <section className="py-5 text-center bg-dark text-white">
        <Container>
          <h1 className="display-4 fw-bold">About This Project</h1>
          <p className="lead mt-3">
            This MERN Stack ToDo List app is designed to help users stay organized and productive by managing daily tasks efficiently.
            Built with React, Express, MongoDB, and Node.js, it offers user-friendly CRUD functionality with secure login and profile management.
          </p>
        </Container>
      </section>

      {/* Section 2: Project Story */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="mb-4 text-center">The Story Behind This Project</h2>
          <p className="text-muted fs-5">
            Like many developers, I found myself constantly juggling personal tasks, work assignments, and learning goals —
            all across sticky notes, phone apps, and mental checklists.
            This inspired me to create a unified platform where everything could be organized with ease.
            I wanted something simple, clean, and personal — with full control over data and customization.
            That's how this MERN Stack ToDo List app was born.
          </p>
        </Container>
      </section>

      {/* Section 3: What Problem It Solves */}
<section className="py-5 bg-white">
  <Container>
    <h2 className="mb-4 text-center">What Problem Does It Solve?</h2>
    <p className="text-muted fs-5">
      In today's busy world, people often struggle to keep track of tasks across multiple platforms and devices. 
      This ToDo List app provides a centralized, secure space for users to manage their daily responsibilities, set priorities, and monitor progress — all from one place.
      With user authentication, personalized profiles, and CRUD features, it replaces scattered notes with a simple, effective productivity system.
    </p>
  </Container>
</section>

{/* Section 4: Target Users */}
<section className="py-5 bg-light">
  <Container>
    <h2 className="mb-4 text-center">Who Is This App For?</h2>
    <p className="text-muted fs-5">
      This ToDoApp is built for anyone who wants to stay organized and boost productivity:
    </p>
    <ul className="fs-5 text-muted">
      <li>Students managing assignments and study plans</li>
      <li> Professionals tracking work tasks and deadlines</li>
      <li> Developers organizing project milestones</li>
      <li> Individuals keeping up with daily goals or personal habits</li>
    </ul>
    <p className="text-muted fs-5">
      If you’ve ever wished for a clean, personal task manager with full control over your data — this app is for you.
    </p>
  </Container>
</section>

{/* Section 5: Project Mission / Vision */}
<section className="py-5 bg-white">
  <Container>
    <h2 className="mb-4 text-center">Our Mission & Vision</h2>
    <p className="text-muted fs-5">
      <strong>Mission:</strong> To empower users to take control of their daily lives through simple, intuitive task management.
    </p>
    <p className="text-muted fs-5">
      <strong>Vision:</strong> To become a go-to productivity tool for individuals seeking a minimal, secure, and fully personalizable task solution —
      built by developers, for everyone.
    </p>
  </Container>
</section>

{/* Section 6: Technology Stack */}
<section className="py-5 bg-light">
  <Container>
    <h2 className="mb-4 text-center">Technology Stack</h2>
    <p className="text-muted fs-5 text-center">
      This project is built using the powerful MERN stack along with other modern tools:
    </p>
    <div className="row text-center">
      <div className="col-md-3">
        <h5>MongoDB</h5>
        <p className="text-muted">For flexible and scalable NoSQL database storage</p>
      </div>
      <div className="col-md-3">
        <h5>Express.js</h5>
        <p className="text-muted">Handles API requests and server-side logic</p>
      </div>
      <div className="col-md-3">
        <h5>React</h5>
        <p className="text-muted">Builds the user interface with reusable components</p>
      </div>
      <div className="col-md-3">
        <h5>Node.js</h5>
        <p className="text-muted">Runs the backend using JavaScript on the server</p>
      </div>
    </div>
    <div className="row text-center mt-4">
      <div className="col-md-4">
        <h6>Axios</h6>
        <p className="text-muted">For client-server API communication</p>
      </div>
      <div className="col-md-4">
        <h6>Bootstrap</h6>
        <p className="text-muted">For responsive UI and layout styling</p>
      </div>
      <div className="col-md-4">
        <h6>React Bootstrap</h6>
        <p className="text-muted">For pre-built UI components</p>
      </div>
    </div>
  </Container>
</section>

{/* Section 7: Key Features */}
<section className="py-5 bg-white">
  <Container>
    <h2 className="mb-4 text-center">Key Features</h2>
    <div className="row text-center">
      <div className="col-md-4 mb-4">
        <h5>Task Management</h5>
        <p className="text-muted">Create, update, and delete tasks in an easy-to-use interface.</p>
      </div>
      <div className="col-md-4 mb-4">
        <h5> User Authentication</h5>
        <p className="text-muted">Register and login securely to access your personalized task list.</p>
      </div>
      <div className="col-md-4 mb-4">
        <h5> Profile Dashboard</h5>
        <p className="text-muted">Manage your personal information and see your task history.</p>
      </div>
      <div className="col-md-4 mb-4">
        <h5> Real-time Updates</h5>
        <p className="text-muted">Instant task updates without page reloads using React state management.</p>
      </div>
      <div className="col-md-4 mb-4">
        <h5> Clean UI</h5>
        <p className="text-muted">Bootstrap-based responsive design for a smooth user experience.</p>
      </div>
      <div className="col-md-4 mb-4">
        <h5> API Driven</h5>
        <p className="text-muted">Seamless front-to-back communication with Express and Axios.</p>
      </div>
    </div>
  </Container>
</section>

{/* Section 9: Challenges Faced */}
<section className="py-5 bg-light">
  <Container>
    <h2 className="mb-4 text-center">Challenges Faced</h2>
    <p className="text-muted fs-5">
      Building this ToDoApp was a rewarding experience, but not without its set of technical and design challenges:
    </p>
    <ul className="fs-5 text-muted">
      <li> Implementing secure authentication without external libraries</li>
      <li> Managing state across different React components in a single-file structure</li>
      <li> Ensuring CORS setup correctly between frontend and backend</li>
      <li> Building all backend logic and database operations in a single `app.js` file</li>
      <li>Creating a fully responsive layout that works well on all screen sizes</li>
    </ul>
    <p className="text-muted fs-5">
      Each challenge helped improve my problem-solving skills and deepened my understanding of the MERN stack.
    </p>
  </Container>
</section>

{/* Section 10: Developer Info */}
<section className="py-5 bg-white">
  <Container>
    <h2 className="mb-4 text-center">Meet the Developer</h2>
    <div className="row align-items-center">
      <div className="col-md-4 text-center mb-4 mb-md-0">
        <img
          src="https://via.placeholder.com/200"
          alt="Developer"
          className="rounded-circle img-fluid"
        />
      </div>
      <div className="col-md-8">
        <h4>Saksham Kaloo</h4>
        <p className="text-muted fs-5">
          Hi, I’m a passionate MERN stack developer focused on building full-stack web applications with simplicity and user experience at the core. 
          I enjoy solving real-world problems and continuously learning new tools and technologies to grow as a developer.
        </p>
        <p className="text-muted fs-6">
          Feel free to connect with me via:
        </p>
        <ul className="list-unstyled fs-6">
          <li> Email: <a href="mailto:youremail@example.com">youremail@example.com</a></li>
          <li> GitHub: <a href="https://github.com/sakshamkaloo" target="_blank" rel="noreferrer">mygithubprofile</a></li>
          <li> LinkedIn: <a href="https://www.linkedin.com/in/saksham-kaloo-0b8768227/" target="_blank" rel="noopener noreferrer">mylinkedinprofile</a></li>
        </ul>
      </div>
    </div>
  </Container>
</section>

{/* Section 13: Testimonials */}
<section className="py-5 bg-light">
  <Container>
    <h2 className="mb-4 text-center">What Users Say</h2>
    <Carousel indicators={false} controls={true} interval={4000}>
      <Carousel.Item>
        <blockquote className="blockquote text-center">
          <p className="mb-4 fs-5">"Simple, fast, and exactly what I needed to keep track of my daily tasks!"</p>
          <footer className="blockquote-footer">Anjali T., <cite title="Source Title">Student & Planner</cite></footer>
        </blockquote>
      </Carousel.Item>
      <Carousel.Item>
        <blockquote className="blockquote text-center">
          <p className="mb-4 fs-5">"The UI is intuitive and responsive. Loved the smooth task updates!"</p>
          <footer className="blockquote-footer">Ravi K., <cite title="Source Title">Freelance Designer</cite></footer>
        </blockquote>
      </Carousel.Item>
      <Carousel.Item>
        <blockquote className="blockquote text-center">
          <p className="mb-4 fs-5">"As someone new to to-do apps, this made task management feel effortless."</p>
          <footer className="blockquote-footer">Meena S., <cite title="Source Title">Teacher</cite></footer>
        </blockquote>
      </Carousel.Item>
    </Carousel>
  </Container>
</section>

{/* Section 14: Call to Action */}
<section className="py-5 bg-primary text-white text-center">
  <Container>
    <h2 className="mb-4">Ready to boost your productivity?</h2>
    <p className="fs-5">
      Join now to start organizing your tasks, tracking progress, and staying ahead—simple and secure!
    </p>
    <a href="/register" className="btn btn-light btn-lg mt-3">
      Get Started
    </a>
  </Container>
</section>



      {/* Footer */}
      <footer className="bg-dark text-white mt-5">
        <Container className="py-4">
          <div className="row">
            <div className="col-md-6">
              <h5>ToDoApp</h5>
              <p>Your productivity partner in the digital world.</p>
            </div>
            <div className="col-md-3">
              <h6>Quick Links</h6>
              <ul className="list-unstyled">
                <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                <li><Link to="/about" className="text-white text-decoration-none">About</Link></li>
                <li><Link to="/contact" className="text-white text-decoration-none">Contact</Link></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h6>Connect</h6>
              <ul className="list-unstyled">
                <li>Email: support@todoapp.com</li>
                <li>GitHub: @todo-dev</li>
              </ul>
            </div>
          </div>
        </Container>
        <div className="text-center bg-secondary py-2">
          &copy; {new Date().getFullYear()} ToDoApp. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default About;
