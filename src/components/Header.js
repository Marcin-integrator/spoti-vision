import React from 'react';
import spotify_logo from '../images/Spotify_Logo_RGB_Black.png';

const Header = () => {
  return (
    <div className="header">
      <img className="spotify" src={spotify_logo} alt="Spotify" />
      <h1>Spotify super awesome visualizer</h1>
    </div>
  );
};

export default Header;
