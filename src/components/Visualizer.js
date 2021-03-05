import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Chip } from '@material-ui/core';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

import {
  getCoverImage,
  initiateGetAudioDetails,
  initiateGetCurrTrack,
} from '../actions/result';
import spotify_icon from '../images/Spotify_Icon_RGB_Black.png';
import { sessionExpired } from '../utils/functions';

const Visualizer = props => {
  const { dispatch, isValidSession, history, location, player } = props;
  const [albumCover, setAlbumCover] = useState('');
  const [trackId, setTrackId] = useState('');
  const [tempo, setTempo] = useState(120);
  const [opaSwitch, setOpaSwitch] = useState(1);

  const vBack = {
    zIndex: 2,
    // visibility: 'hidden',
    opacity: opaSwitch,
    transition: 'visibility 0s 1s, opacity 1s linear',
  };

  const showItems = () => {
    setOpaSwitch(1);
    setTimeout(() => {
      setOpaSwitch(0);
    }, 2000);
  };

  useEffect(() => {
    window.addEventListener('mousemove', showItems);
    showItems();
  }, []);

  // should somehow adjust
  const diagonal = Math.sqrt(
    window.innerWidth * window.innerWidth +
      window.innerHeight * window.innerHeight
  );

  useEffect(() => {
    if (isValidSession()) {
      const currTrack = async () => {
        const result = await dispatch(initiateGetCurrTrack());
        const { id } = result?.track ? result.track.item : '';
        setTrackId(id);
      };
      if (!trackId) {
        currTrack();
      } else {
        setAlbumCover(player.item.album.images[0].url);
        setTimeout(currTrack, player.timer);
      }
    } else {
      sessionExpired(history, location.pathname);
    }
  }, [dispatch, isValidSession, history, location, player, trackId]);

  useEffect(() => {
    const getThoseColours = () => {
      dispatch(getCoverImage(albumCover));
    };
    if (albumCover) {
      getThoseColours();
    }
  }, [albumCover, dispatch]);

  useEffect(() => {
    if (isValidSession()) {
      dispatch(initiateGetAudioDetails(trackId));
    } else {
      sessionExpired(history, location.pathname);
    }
  }, [dispatch, isValidSession, history, location, trackId]);

  useEffect(() => {
    setTempo(player?.audio ? player.audio.tempo : 120);
  }, [player.audio]);

  if (!_.isEmpty(player.item)) {
    const backColors = player?.cover
      ? player.cover.result.colors.image_colors
      : ['gray', 'black', 'darkred'];

    const first = backColors[0];
    const second = backColors[1];
    const third = backColors[2];

    const speed = (60 * 36 * 4) / tempo;

    const background = {
      background: `repeating-conic-gradient(from 0deg, ${
        player?.cover ? first.closest_palette_color_html_code : first
      } 0deg 10deg, ${
        player?.cover ? second.closest_palette_color_html_code : second
      } 10deg 20deg, ${
        player?.cover ? third.closest_palette_color_html_code : third
      } 20deg 30deg)`,
      animation: `rotate ${speed}s linear infinite`,
      width: `${diagonal}px`,
      height: `${diagonal}px`,
      borderRadius: '100%',
      left: `-${(diagonal - window.innerWidth) / 2}px`,
    };

    const cover = player.item.album.images[0];
    const height = cover.height;

    return (
      <>
        <div>
          <div className="back">
            <img
              style={vBack}
              className="spotify v-background"
              src={spotify_icon}
              alt="Spotify"
            />
            <Link to="/dashboard">
              <ExitToAppRoundedIcon
                className="v-background"
                id="exit-v"
                style={vBack}
              />
            </Link>
            {!_.isEmpty(player) && (
              <>
                <img
                  className="cover"
                  style={{ marginTop: `calc(50vh - ${height / 2}px)` }}
                  alt={player.item.name}
                  src={cover.url}
                />
                <Chip
                  style={vBack}
                  id="cover-label"
                  label={`${player.item.artists[0].name} - ${player.item.name}`}
                />
              </>
            )}
          </div>
          <div className="backy" style={background}></div>
        </div>
      </>
    );
  }
  return null;
};

const mapaStateToProps = state => {
  return {
    player: state.player,
  };
};

export default connect(mapaStateToProps)(Visualizer);
