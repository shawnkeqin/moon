import React from "react";
import { Row, Col } from "antd";

const footerStyle = {
  marginLeft: "250px",
};
function Footer() {
  return (
    <footer id="footer" className="dark" style={footerStyle}>
      <div className="footer-wrap">
        <Row>
          <Col lg={4} sm={24} xs={24}>
            <div className="footer-center">
              <h2>About Us</h2>
              <div>
                <a target="_blank " href="#">
                  Learn More
                </a>
              </div>
            </div>
          </Col>
          <Col lg={4} sm={24} xs={24}>
            <div className="footer-center">
              <h2>Terms of Service</h2>
              <div>
                <a href="#">Click to view</a>
              </div>
            </div>
          </Col>
          <Col lg={4} sm={24} xs={24}>
            <div className="footer-center">
              <h2>Contact Us</h2>
              <div>
                <a href="#">Send us a message</a>
              </div>
            </div>
          </Col>
          <Col lg={4} sm={24} xs={24}>
            <div className="footer-center">
              <h2>Privacy</h2>
              <div>
                <a href="#">Click to view</a>
              </div>
            </div>
          </Col>
          <Col lg={8} sm={24} xs={24}>
            <div className="footer-center">
              <h2>Built in:</h2>
              <div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://ant.design/"
                >
                  Singapore / NYC
                </a>
                <span> - </span>
                <span>Currently in beta release v1.0.0</span>
              </div>
       
            </div>
          </Col>
        </Row>
      </div>
      <Row className="bottom-bar">
        <Col lg={6} sm={24} />
        <Col lg={18} sm={24}>
          <span
            style={{
              lineHeight: "16px",
              paddingRight: 12,
              marginRight: 11,
              borderRight: "1px solid rgba(255, 255, 255, 0.55)",
            }}
          >
            <a
              href=""
              rel="noopener noreferrer"
              target="_blank"
            >
              +65 97244001
            </a>
          </span>
          <span style={{ marginRight: 24 }}>
            <a
              href=""
              rel="noopener noreferrer"
              target="_blank"
            >
             shawnlimkq95@gmail.com
            </a>
          </span>
          <span style={{ marginRight: 12 }}>Copyright © 🚀 moon</span>
          <span style={{ marginRight: 12 }}>All rights reserved.</span>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
