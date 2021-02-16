import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';

const Current = ({ player }) => {
  const cover = player.item.album.images[1];

  return (
    <Link to="/visualizer">
      <Tooltip placement="bottom" title={player.item.name}>
        <img alt={player.item.name} src={cover.url} />
      </Tooltip>
    </Link>
  );
};

export default Current;
