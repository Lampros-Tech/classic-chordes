import React from "react";
import Composer from "./piano/Composer";
import "./player.css";

const Player = () => {
  return (
    <div className="player">
      <div className="player-main">
        <span className="piano-label">PIANO</span>
        <div className="piano-holder">
          <div className="piano-main">
            <Composer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
