import React from "react";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import Loading from "../Loading/Loading";
import "./AboutUs.css";
import Duy from "../../images/duy.jpg";
import Bao from "../../images/bao.jpg";
import Bitcoin from "../../images/bitcoin.png";
import { Link } from "react-router-dom";

const Aboutus = () => {
  if (!Aboutus) return <Loading />;
  return (
    <>
      <NavBar />
      <section className="aboutus">
        <div className="aboutus_main">
          <div className="aboutus_container">
            <img src={Duy} alt="duy" className="profile_img" />
            <div className="about-detail">
              <h1>Đặng Đăng Duy</h1>
              <h5>
                Developer & <span>Designer</span>
              </h5>
              <p>
                I am a back-end developer. I'm from Dong Nai city and I like
                playing soccer with my friends. I can provide clean code and
                perfect design.
              </p>
              <a href="https://www.facebook.com/duya22105" target="_blank">
                Chat me
              </a>
            </div>
          </div>
          <div className="aboutus_container">
            <img src={Bao} alt="bao" className="profile_img" />
            <div className="about-detail">
              <h1>Cao Minh Bảo</h1>
              <h5>
                Developer & <span>Designer</span>
              </h5>
              <p>
                I am a front-end developer. I'm from Quang Ngai city and I like
                playing badminton with my friends. I can provide clean code and
                perfect design.
              </p>
              <a
                href="https://www.facebook.com/profile.php?id=100016835077654"
                target="_blank"
              >
                Chat me
              </a>
            </div>
          </div>
          <div className="aboutus_coin">
            <div className="circle_coin"></div>
            <div className="coin_text">
              <h2>
                It's not a website <br />
                It's <span>Future</span>
              </h2>
              <p>
                "As the value goes up, heads start to swivel, and sceptics
                soften. Starting a new currency is easy. Anyone can do it. The
                trick is getting people to accept it because it is their use
                that gives the 'money' value. — Adam B. Levine"
              </p>
              <Link
                // onClick="return false"
                style={{ textDecoration: "none" }}
                to="/markets"
              >
                Let's go
              </Link>
            </div>
            <div className="coin_box1">
              <img src={Bitcoin} alt="btc" className="bitcoin1" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Aboutus;
