import React from "react";

const MenuFooter = () => {
  return (
    <footer style={{
      backgroundColor: "#222",
      color: "#fff",
      padding: "3rem 1rem 1rem",
      marginTop: "3rem",
      borderTop: "4px solid #FF8C00",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Add these CDN links to your public/index.html */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
      />
      <link 
        href="https://fonts.googleapis.com/icon?family=Material+Icons" 
        rel="stylesheet"
      />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        paddingBottom: "2rem"
      }}>
        {/* About Section */}
        <div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
            <i 
              className="fas fa-utensils"
              style={{
                fontSize: "2rem",
                color: "#FFA500",
                marginRight: "1rem"
              }}
            ></i>
            <h3 style={{
              color: "#FFA500",
              fontSize: "1.5rem",
              margin: 0,
              borderBottom: "2px solid #FF8C00",
              paddingBottom: "0.5rem"
            }}>ABOUT</h3>
          </div>
          <p style={{ lineHeight: "1.6", color: "#ddd" }}>
            Chaitanya Bharathi Institute of Technology, Hyderabad, is a prestigious institute established in 1979 and approved by AICTE.
          </p>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
            <a href="#" style={{ color: "white", fontSize: "1.5rem" }}>
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" style={{ color: "white", fontSize: "1.5rem" }}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" style={{ color: "white", fontSize: "1.5rem" }}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" style={{ color: "white", fontSize: "1.5rem" }}>
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 style={{
            color: "#FFA500",
            fontSize: "1.5rem",
            marginBottom: "1rem",
            borderBottom: "2px solid #FF8C00",
            paddingBottom: "0.5rem"
          }}>QUICK LINKS</h3>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: "2.2" }}>
            <li>
              <a href="#" style={{
                color: "#ddd",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s ease",
                padding: "0.2rem 0"
              }} onMouseEnter={(e) => e.currentTarget.style.color = "#FFA500"}
                 onMouseLeave={(e) => e.currentTarget.style.color = "#ddd"}>
                <i className="fas fa-home" style={{ width: "20px" }}></i>
                Canteen Home
              </a>
            </li>
            <li style={{ borderBottom: "1px solid #444", width: "80%" }}></li>
            <li>
              <a href="#" style={{
                color: "#ddd",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s ease",
                padding: "0.2rem 0"
              }} onMouseEnter={(e) => e.currentTarget.style.color = "#FFA500"}
                 onMouseLeave={(e) => e.currentTarget.style.color = "#ddd"}>
                <i className="fas fa-eye" style={{ width: "20px" }}></i>
                Our Vision
              </a>
            </li>
            <li style={{ borderBottom: "1px solid #444", width: "80%" }}></li>
            <li>
              <a href="#" style={{
                color: "#ddd",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s ease",
                padding: "0.2rem 0"
              }} onMouseEnter={(e) => e.currentTarget.style.color = "#FFA500"}
                 onMouseLeave={(e) => e.currentTarget.style.color = "#ddd"}>
                <i className="fab fa-github" style={{ width: "20px" }}></i>
                Git Repository
              </a>
            </li>
            <li style={{ borderBottom: "1px solid #444", width: "80%" }}></li>
            <li>
              <a href="https://www.cbit.ac.in" style={{
                color: "#ddd",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s ease",
                padding: "0.2rem 0"
              }} onMouseEnter={(e) => e.currentTarget.style.color = "#FFA500"}
                 onMouseLeave={(e) => e.currentTarget.style.color = "#ddd"}>
                <i className="fas fa-school" style={{ width: "20px" }}></i>
                CBIT Hyd
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 style={{
            color: "#FFA500",
            fontSize: "1.5rem",
            marginBottom: "1rem",
            borderBottom: "2px solid #FF8C00",
            paddingBottom: "0.5rem"
          }}>CONTACT INFORMATION</h3>
          <div style={{ lineHeight: "1.8", color: "#ddd" }}>
            <p style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <i className="fas fa-phone" style={{ color: "#FFA500" }}></i>
              +91-040-24193276
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <i className="fas fa-envelope" style={{ color: "#FFA500" }}></i>
              principal@cbit.ac.in
            </p>
            <p style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
              <i className="fas fa-map-marker-alt" style={{ color: "#FFA500", marginTop: "3px" }}></i>
              Chaitanya Bharathi Institute of Technology,<br />
              Gandipet, Hyderabad, Telangana,<br />
              India, PIN: 500075
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <i className="fas fa-globe" style={{ color: "#FFA500" }}></i>
              <a href="https://www.cbit.ac.in" style={{ color: "#FFA500", textDecoration: "none" }}>
                www.cbit.ac.in
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div style={{
        textAlign: "center",
        paddingTop: "2rem",
        marginTop: "2rem",
        borderTop: "1px solid #444",
        color: "#aaa",
        fontSize: "0.9rem"
      }}>
        <p>Copyright © 2023 - 2024. All Rights Reserved</p>
        <p style={{ marginTop: "0.5rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
          <i className="fas fa-code" style={{ color: "#FFA500" }}></i>
          Designed & Developed with ❤️ by 
          <strong style={{ color: "#FFA500", marginLeft: "0.5rem" }}>Akber</strong> and 
          <strong style={{ color: "#FFA500" }}>Viraj</strong>
        </p>
      </div>
    </footer>
  );
};

export default MenuFooter;