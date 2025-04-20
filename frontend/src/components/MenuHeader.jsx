import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MenuHeader = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/visitors/count");
        setVisitorCount(response.data.count);
      } catch (error) {
        console.error("❌ Error fetching visitor count:", error);
      }
    };

    fetchVisitorCount();
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clear all stored items
    navigate("/login"); // Redirect to login page
  };

  return (
    <Navbar 
      expand="lg" 
      style={{
        background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
        padding: '0.5rem 1rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}
    >
      <Container fluid>
        <Navbar.Brand 
          href="/" 
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5rem'
          }}
        >
          CBIT CANTEEN
        </Navbar.Brand>

        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          style={{
            border: 'none',
            color: 'white'
          }}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav 
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '50px',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>👥</span>
              <span>Visitors Today:</span>
              <span style={{ fontWeight: 'bold', marginLeft: '4px' }}>
                {visitorCount.toLocaleString()}
              </span>
            </div>

            <Button
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#FF8C00',
                border: 'none',
                padding: '0.5rem 1.25rem',
                borderRadius: '50px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              onClick={handleLogout} // Add logout functionality
            >
              <span>🚪</span>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MenuHeader;