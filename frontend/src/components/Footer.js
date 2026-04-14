import React from "react";
import "./FooterStyles.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-top">
        <div>
          <h3>Trippy</h3>
          <p>Your perfect travel companion. Explore the world with us.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <p>Home</p>
          <p>About</p>
          <p>Services</p>
          <p>Contact</p>
        </div>
        <div>
          <h4>Contact Info</h4>
          <p>📧 info@trippy.com</p>
          <p>📞 +91 98765 43210</p>
          <p>📍 Mumbai, India</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Trippy. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
