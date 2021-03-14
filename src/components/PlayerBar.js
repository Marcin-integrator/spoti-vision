import React, { useEffect, useState } from 'react';
import {
  PauseCircleOutline,
  PlayCircleOutline,
  SkipNext,
  SkipPrevious,
} from '@material-ui/icons/';

import { pause, play } from '../utils/api';
import { progressCounter } from '../utils/functions';

const PlayerBar = props => {
  const { player } = props;
  const totalSeconds = player.item.duration_ms;
  const duration = progressCounter(totalSeconds);
  const cover = player.item.album.images[2];

  const [playback, setPlayback] = useState(false);
  const [progress, setProgress] = useState(`0 : 00`);

  useEffect(() => {
    setPlayback(player.is_playing);
  }, [player.is_playing]);

  useEffect(() => {
    let duration = player.progress_ms / 1000;
    let sec = Math.round(duration % 60);
    let min = Math.floor(duration / 60);

    const counter = () => {
      if (sec === 59) {
        ++min;
        sec = -1;
      }
      ++sec;
      const fixedSec = sec < 10 ? `0${sec}` : sec;
      setProgress(`${min} : ${fixedSec}`);
    };
    let interval = setInterval(() => {
      counter();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [player.progress_ms]);

  const managePause = () => {
    pause();
    setPlayback(false);
  };

  const managePlay = () => {
    play();
    setPlayback(true);
  };

  return (
    <div className="player-bar">
      <img src={cover.url} alt={player.item.album.name} />
      <div className="duration-area">
        <div>{progress}</div>
        <div className="progress-bar"></div>
        <div>{duration}</div>
      </div>
      <div className="manage-area">
        <SkipPrevious id="prev-button" />
        {playback ? (
          <PauseCircleOutline id="pause-button" onClick={() => managePause()} />
        ) : (
          <PlayCircleOutline id="play-button" onClick={() => managePlay()} />
        )}
        <SkipNext id="forw-button" />
      </div>
    </div>
  );
};

export default PlayerBar;
