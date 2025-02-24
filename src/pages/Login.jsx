import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Card className="p-4 shadow-lg animate__animated animate__fadeInUp" style={{ width: "350px" }}>
        <h2 className="text-center mb-3">Login</h2>
        <Form>
          <Form.Group className="mb-2">
            <Form.Control type="email" placeholder="Email or Username" />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button className="btn-primary w-100">Login</Button>
        </Form>
        <p className="text-center mt-2">
          No account? <a href="/signup">Sign up</a>
        </p>
      </Card>
    </Container>
  );
};

export default Login;
