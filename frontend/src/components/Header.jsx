import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";

const Header = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Pages where we don't want to show Logout
  const hideLogoutPaths = ["/", "/login", "/signup"];
  const isAuthPage = hideLogoutPaths.includes(location.pathname);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await API.get("/visitors/count");
        setVisitorCount(response.data.count);
      } catch (error) {
        console.error("Error fetching visitor count:", error);
      }
    };

    fetchVisitorCount();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar 
      expand="lg" 
      className="shadow-sm"
      style={{
        background: 'linear-gradient(135deg, #4a90e2, #67a7e6)',
        padding: '1rem'
      }}
    >
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/")}
          className="fw-bold"
          style={{ 
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          CBIT Canteen
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {location.pathname === "/" && (
              <>
                <Button
                  variant="light"
                  className="me-2 rounded-pill"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </Button>
                <Button
                  variant="outline-light"
                  className="me-3 rounded-pill"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </>
            )}
            {!isAuthPage && (
              <Button 
                variant="danger" 
                className="me-3 rounded-pill"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
            <span className="text-white">
              Visitors: {visitorCount}
            </span>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
