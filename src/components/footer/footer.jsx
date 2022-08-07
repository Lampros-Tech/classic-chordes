import React from "react";
import "./footer.css";
import { ParallaxHover } from "react-parallax-hover";
import Zora from "../../images/zora.svg"
import Polygon from "../../images/polygon.svg"
import NftStorage from "../../images/nftstorage.svg"
import LivePeer from "../../images/livepeer.svg"
import Lit from "../../images/lit.svg"


function Footer() {
  return (
    <section className="footer">
      <section className="footer-header">
       <div>Powered By</div>
      </section>
      <div className="imgseperator-top">
      <section><ParallaxHover borderRadius={20} scale={5} width={300} height={300}><div className="footer-img-bg"><div className="footer-img-i"><img className="zora-img" src={Zora}/></div></div></ParallaxHover></section>
      <section><ParallaxHover borderRadius={20} scale={5} width={300} height={300}><div className="footer-img-bg"><div className="footer-img-i"><img className="polygon-img" src={Polygon}/></div></div></ParallaxHover></section>
      <section><ParallaxHover borderRadius={20} scale={5} width={300} height={300}><div className="footer-img-bg"><div className="footer-img-i"><img className="nfts-img" src={NftStorage}/></div></div></ParallaxHover></section>
      </div>
      <div className="imgseperator-down">
      <section><ParallaxHover borderRadius={20} scale={5} width={300} height={300}><div className="footer-img-bg"><div className="footer-img-i"><img className="live-img" src={LivePeer}/></div></div></ParallaxHover></section>
      <section><ParallaxHover borderRadius={20} scale={5} width={300} height={300}><div className="footer-img-bg"><div className="footer-img-i"><img className="lit-img" src={Lit}/></div></div></ParallaxHover></section>
      </div>
      
      {/* <div><p className="col-sm">
            &copy;{new Date().getFullYear()} Biscuit | All rights reserved |
            Terms Of Service | Privacy
          </p></div> */}
    </section>
  );
}

export default Footer;
