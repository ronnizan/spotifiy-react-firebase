import React from "react";
import BodyPlayer from "../body-player/BodyPlayer";
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";
import "./Player.css";

const Player = ({ spotify }) => {
  return (
    <div className='player'>
      <div className='player__body'>
        <Sidebar />
        <BodyPlayer spotify={spotify} />
      </div>
    

      <Footer spotify={spotify} />
    </div>
  );
};

export default Player;
