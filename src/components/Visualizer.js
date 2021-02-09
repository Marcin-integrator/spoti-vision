import React from 'react';
import { connect } from 'react-redux';
import { initiateGetCurrTrack } from '../actions/result';
import { Redirect } from 'react-router-dom';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { Link } from 'react-router-dom';

import _ from 'lodash';

const Visualizer = ({ dispatch, isValidSession, player }) => {
  if (_.isEmpty(player)) {
    dispatch(initiateGetCurrTrack());
  } else {
    const cover = player.item.album.images[0];
    const height = cover.height;
    console.log(player);

    return (
      <React.Fragment>
        {isValidSession() ? (
          <div className="back">
            <Link to="/dashboard">
              <ExitToAppRoundedIcon id="exit-v" fontSize="large" />
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
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: {
                session_expired: true,
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
