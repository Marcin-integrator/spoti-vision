import React from 'react';
import { Link } from 'react-router-dom';

const Current = ({ player }) => {
  const cover = player.item.album.images[1];

  return (
    <Link to="/visualizer">
      <img alt={player.item.name} src={cover.url} />
    </Link>
  );
};

export default Current;
