import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import API from "../services/api";

const MenuHeader = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      const response = await API.get("/visitors/count");
      setVisitorCount(response.data.count);
    };

    fetchVisitorCount();
  }, []);

  return (
    <Navbar expand="lg" className="bg-light shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="fw-bold text-brown">CBIT Canteen</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <span className="ms-auto">Visitors: {visitorCount}</span>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MenuHeader;
