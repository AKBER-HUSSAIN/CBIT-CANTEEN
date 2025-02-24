import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100 animate__animated animate__fadeIn">
      <h1 className="mb-4 fw-bold">Choose Your Role</h1>
      <Button className="btn-lg m-2 animate__animated animate__pulse animate__infinite" onClick={() => navigate("/login")}>
        I am a User
      </Button>
      <Button className="btn-lg m-2 animate__animated animate__pulse animate__infinite" onClick={() => navigate("/login")}>
        I am a Chef
      </Button>
    </Container>
  );
};

export default RoleSelection;
