import React from "react";
import "./home.css";
import { ParallaxHover } from "react-parallax-hover";
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
            <div className="home-button-div">
              <button className="home-button">Play Now</button>
            </div>
          </div>
          <div className="home-right">
            <div class="muzieknootjes">
              <div class="noot-1">&#9835; &#9833;</div>
              <div class="noot-2">&#9833;</div>
              <div class="noot-3">&#9839; &#9834;</div>
              <div class="noot-4">&#9834;</div>
            </div>
            <img className="home-img" src={HomeImg} />
          </div>
        </div>
        <div className="inst-header">Instructions</div>
        <div className="inst-main">
          <ParallaxHover borderRadius={20} scale={5} width={400} height={600}>
            <div className="inst-bg"></div>
          </ParallaxHover>
          <ParallaxHover borderRadius={20} scale={5} width={400} height={600}>
            <div className="inst-bg"></div>
          </ParallaxHover>
          <ParallaxHover borderRadius={20} scale={5} width={400} height={600}>
            <div className="inst-bg"></div>
          </ParallaxHover>
        </div>
      </div>
    </div>
  );
};

export default Home;
