import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";

const Signup = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Card className="p-4 shadow-lg animate__animated animate__fadeInUp" style={{ width: "350px" }}>
        <h2 className="text-center mb-3">Sign Up</h2>
        <Form>
          <Form.Group className="mb-2">
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button className="btn-success w-100">Create Account</Button>
        </Form>
        <p className="text-center mt-2">
          Already have an account? <a href="/login">Login</a>
        </p>
      </Card>
    </Container>
  );
};

export default Signup;
