
import { Container, Form, Button,Row, Col,} from 'react-bootstrap';

function Contact(){
    return(
        <>
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

    {/* Section 1: Page Title + Intro */}
<section className="py-5 bg-light text-center">
  <Container>
    <h1 className="mb-3">Contact Us</h1>
    <p className="fs-5">
      Have questions, suggestions, or feedback? We’d love to hear from you! Reach out through any of the options below and we’ll get back to you as soon as possible.
    </p>
  </Container>
</section>
   
    {/* Section 2: Contact Form */}
<section className="py-5">
  <Container>
    <h2 className="mb-4 text-center">Send Us a Message</h2>
    <Form className="mx-auto" style={{ maxWidth: '600px' }}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMessage">
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows={4} placeholder="Write your message..." />
      </Form.Group>

      <div className="text-center">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  </Container>
</section>


{/* Section 3: Contact Information */}
<section className="py-5 bg-light">
  <Container>
    <h2 className="mb-4 text-center">Our Contact Details</h2>
    <Row className="text-center">
      <Col md={4} className="mb-4">
        <h5>Email</h5>
        <p>support@todolistapp.com</p>
      </Col>
      <Col md={4} className="mb-4">
        <h5>Phone</h5>
        <p>+91 98765 43210</p>
      </Col>
      <Col md={4} className="mb-4">
        <h5>Address</h5>
        <p>123, Developer Street, Tech City, India</p>
      </Col>
    </Row>
  </Container>
</section>
  

  {/* Section 4: Map Integration */}
<section className="py-5">
  <Container>
    <h2 className="mb-4 text-center">Find Us Here</h2>
    <div className="d-flex justify-content-center">
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.431070814136!2d75.7885!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5d6c1234567%3A0xabcdef1234567890!2sYour%20Office%20Location!5e0!3m2!1sen!2sin!4v1699888888888"
        width="100%"
        height="350"
        style={{ border: 0, maxWidth: '800px' }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  </Container>
</section>


{/* Section 5: Business Hours */}
<section className="py-5 bg-light">
  <Container>
    <h2 className="mb-4 text-center">Business Hours</h2>
    <Row className="justify-content-center">
      <Col md={6}>
        <ul className="list-group fs-5">
          <li className="list-group-item d-flex justify-content-between">
            <span>Monday - Friday</span>
            <span>9:00 AM – 7:00 PM</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Saturday</span>
            <span>10:00 AM – 5:00 PM</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Sunday</span>
            <span>Closed</span>
          </li>
        </ul>
      </Col>
    </Row>
  </Container>
</section>
 

 {/* Section 6: Social Media Links */}
<section className="py-5 text-center">
  <Container>
    <h2 className="mb-4">Connect With Us</h2>
    <div className="d-flex justify-content-center gap-4 fs-3">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <i className="bi bi-facebook text-primary"></i>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <i className="bi bi-twitter text-info"></i>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <i className="bi bi-instagram text-danger"></i>
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <i className="bi bi-linkedin text-primary"></i>
      </a>
      <a href="mailto:support@todolistapp.com">
        <i className="bi bi-envelope-fill text-dark"></i>
      </a>
    </div>
  </Container>
</section>


{/* Section 10: Call to Action (CTA) */}
<section className="py-5 bg-primary text-white text-center">
  <Container>
    <h2 className="mb-3">Still have questions?</h2>
    <p className="mb-4 fs-5">
      Reach out to us anytime — we’re here to help you stay productive and organized!
    </p>
    <Button variant="light" size="lg" href="/register">
      Register Now
    </Button>
  </Container>
</section>


        
        </>
    )
}

export default Contact;