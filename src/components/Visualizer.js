import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initiateGetCurrTrack } from '../actions/result';
import { Redirect } from 'react-router-dom';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { Link } from 'react-router-dom';
import spotify_icon from '../images/Spotify_Icon_RGB_Black.png';
import _ from 'lodash';

const Visualizer = props => {
  const { dispatch, isValidSession, history, location, player } = props;
  console.log(props);
  const diagonal = Math.sqrt(
    window.innerWidth * window.innerWidth +
      window.innerHeight * window.innerHeight
  );
  // if (_.isEmpty(player)) {
  //   dispatch(initiateGetCurrTrack());
  // } else {
  useEffect(() => {
    props.dispatch(initiateGetCurrTrack());
  }, []);

  if (isValidSession()) {
    const currTrack = () => {
      dispatch(initiateGetCurrTrack());
    };
    setTimeout(currTrack, player.timer);
  } else {
    history.push({
      pathname: '/',
      state: {
        session_expired: true,
        whereTo: location.pathname,
      },
    });
  }

  const backColors = player?.cover
    ? player.cover.result.colors.image_colors
    : ['white', 'orange', 'lightBlue'];
  // const backColors = ['white', 'orange', 'lightBlue'];

  console.log(backColors);
  const first = backColors[0];
  const second = backColors[1];
  const third = backColors[2];

  const background = {
    // background:
    //   'radial-gradient(transparent 50%, white), radial-gradient(yellow, transparent 70%)',
    // background: `repeating-conic-gradient(from 0deg, ${first.closest_palette_color_html_code} 0deg 10deg, ${second.closest_palette_color_html_code} 10deg 20deg, ${third.closest_palette_color_html_code} 20deg 30deg)`,
    background: `repeating-conic-gradient(from 0deg, ${first} 0deg 10deg, ${second} 10deg 20deg, ${third} 20deg 30deg)`,
    animation: 'rotate 80s linear infinite',
    width: `${diagonal}px`,
    height: `${diagonal}px`,
    borderRadius: '100%',
    left: `-${(diagonal - window.innerWidth) / 2}px`,
  };

  if (!_.isEmpty(player)) {
    const cover = player.item.album.images[0];
    const height = cover.height;

    return (
      <React.Fragment>
        {isValidSession() ? (
          <div>
            <div className="back">
              <img
                className="spotify v-background"
                src={spotify_icon}
                alt="Spotify"
              />
              <Link to="/dashboard">
                <ExitToAppRoundedIcon className="v-background" id="exit-v" />
              </Link>
              {!_.isEmpty(player) && (
                <img
                  className="cover"
                  style={{ marginTop: `calc(50vh - ${height / 2}px)` }}
                  alt={player.item.name}
                  src={cover.url}
                />
              )}
            </div>
            <div className="backy" style={background}></div>
          </div>
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: {
                session_expired: true,
                whereTo: location.pathname,
              },
            }}
          />
        )}
      </React.Fragment>
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
