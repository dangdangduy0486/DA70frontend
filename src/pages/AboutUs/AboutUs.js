import React from "react";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import "./AboutUs.css";
import Duy from "../../images/duy.jpg";
import Bao from "../../images/bao.jpg";
import Bitcoin from "../../images/bitcoin.png";

const Aboutus = () => {
  // function changeImage() {
  //   console.log(document.querySelector(".bitcoin1").src);
  // }
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
                I am a back-end developer. I can provide clean code and perfect
                design. I am a back-end developer. I can provide clean code and
                perfect design. I am a back-end developer. I can provide clean
                code and perfect design
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
                I am a front-end developer. I can provide clean code and perfect
                design. I am a back-end developer. I can provide clean code and
                perfect design. I am a back-end developer. I can provide clean
                code and perfect design
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Corrupti natus sint sapiente blanditiis maxime officiis,
                adipisci libero odio atque qui nemo, fugit quisquam quae sit,
                laborum nobis error saepe voluptatibus?
              </p>
              <a href="#">Let's go</a>
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
