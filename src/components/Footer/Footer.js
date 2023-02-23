import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container_footer">
          <div className="footet_left">
            <h5>
              <Link
                style={{ textDecoration: "none", color: "rgb(178, 174, 174)" }}
                to="/aboutus"
              >
                About us
              </Link>
            </h5>
            <p>
              It is my website about creating a crypto website. We wish it can
              help you earning money
            </p>
          </div>
          <div className="footet_middle">
            <h5>About coin</h5>
            <Link
              style={{ textDecoration: "none", color: "rgb(178, 174, 174)" }}
              to="/markets"
            >
              Market
            </Link>
            <Link
              style={{ textDecoration: "none", color: "rgb(178, 174, 174)" }}
              to="/converter"
            >
              Converter
            </Link>
          </div>
          <div className="footet_right">
            <h5>Community</h5>
            <a
              style={{ textDecoration: "none", color: "rgb(178, 174, 174)" }}
              href="https://www.facebook.com/profile.php?id=100016835077654"
            >
              Minh Bao
            </a>
            <a
              style={{ textDecoration: "none", color: "rgb(178, 174, 174)" }}
              href="https://www.facebook.com/dangduy2105"
            >
              Dang Duy
            </a>
          </div>
        </div>
        <div className="copy_right text-center ">@Binance © 2022</div>
      </footer>
    </>
  );
};

export default Footer;
