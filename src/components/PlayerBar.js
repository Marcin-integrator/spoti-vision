import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  PauseCircleOutline,
  PlayCircleOutline,
  SkipNext,
  SkipPrevious,
} from '@material-ui/icons/';

import { initiateGetCurrTrack } from '../actions/result';
import music from '../images/music-icon.jpg';
import { managePlayer } from '../utils/api';
import { progressCounter, sessionExpired } from '../utils/functions';

const PlayerBar = props => {
  const { dispatch, isValidSession, history, location, player } = props;

  const [playback, setPlayback] = useState(false);
  const [progress, setProgress] = useState(`0 : 00`);
  const [duration, setDuration] = useState(`0 : 00`);
  const [cover, setCover] = useState(null);
  const [step, setStep] = useState(0);
  let [sec, setSec] = useState(0);
  let [min, setMin] = useState(0);
  const [expand, setExpand] = useState(0);

  const progression = {
    backgroundColor: 'green',
    height: '100%',
    width: `${expand}%`,
  };

  if (expand >= 100) {
    setPlayback(false);
  }

  //move to useEffect or create useCallback
  const counter = () => {
    if (sec === 59) {
      ++min;
      sec = -1;
    }
    ++sec;
    setExpand(step * (sec + min * 60));
    const fixedSec = sec < 10 ? `0${sec}` : sec;
    setProgress(`${min} : ${fixedSec}`);
  };

  useEffect(() => {
    const currPosition = player.progress_ms / 1000;
    setSec(Math.round(currPosition % 60));
    setMin(Math.floor(currPosition / 60));
  }, [player.progress_ms]);

  useEffect(() => {
    const interval = setInterval(() => {
      counter();
    }, 1000);
    if (!playback) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [playback, player.item, step]);

  useEffect(() => {
    setPlayback(player.is_playing);
  }, [player.is_playing]);

  useEffect(() => {
    const totalMseconds = player.item.duration_ms;
    setDuration(progressCounter(totalMseconds));
    setCover(player.item.album.images[2]);
    const totSeconds = Math.round(totalMseconds / 1000);
    const movingBar = 100 / totSeconds;
    setStep(movingBar);
    setPlayback(true);
  }, [duration, player.item]);

  const playerCommand = async action => {
    if (isValidSession()) {
      await managePlayer(action);
      if (action === 'pause') {
        setPlayback(false);
      } else {
        // setPlayback(true);
        const getCurr = () => dispatch(initiateGetCurrTrack());
        // due to the asynchronous nature of the request
        setTimeout(getCurr, 1000);
      }
    } else {
      sessionExpired(history, location.pathname);
    }
  };

  return (
    <div className="player-bar">
      {cover ? (
        <img src={cover.url} alt={player.item.album.name} />
      ) : (
        <img src={music} alt={player.item.album.name} className="cover-small" />
      )}
      <div className="duration-area">
        <div>{progress}</div>
        <div className="progress-bar">
          <div style={progression}></div>
        </div>
        <div>{duration}</div>
      </div>
      <div className="manage-area">
        <SkipPrevious
          id="prev-button"
          onClick={() => playerCommand('previous')}
        />
        {playback ? (
          <PauseCircleOutline
            id="pause-button"
            onClick={() => playerCommand('pause')}
          />
        ) : (
          <PlayCircleOutline
            id="play-button"
            onClick={() => playerCommand('play')}
          />
        )}
        <SkipNext id="forw-button" onClick={() => playerCommand('next')} />
      </div>
    </div>
  );
};

const mapaStateToProps = state => {
  return {
    player: state.player,
  };
};

export default connect(mapaStateToProps)(PlayerBar);
