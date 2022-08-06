import React from "react";
import "./home.css";
import HomeLogo from "../../images/homelogo.png";
import HomeText from "../../images/hometext.png";
import HomeButton from "../../images/homebutton.png";
import HomeImg from "../../images/homeimg.png";

const Home = () => {
  return (
    <div className="home">
      <div className="outerbg">
        <div className="innerbg">
          <div className="home-left">
            <div className="home-logo">Classic Chords</div>

            <div className="home-content">
              Unleash The Artist In You, & Make Your Own Web3 Music
            </div>

            <button className="home-button">Play Now</button>
          </div>
          <div className="home-right">
            <img className="home-img" src={HomeImg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
