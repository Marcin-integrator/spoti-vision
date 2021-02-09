import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Header from './Header';
import { Redirect } from 'react-router-dom';

const Home = props => {
  const {
    REACT_APP_CLIENT_ID,
    REACT_APP_AUTHORIZE_URL,
    REACT_APP_REDIRECT_URL,
  } = process.env;

  const handleLogin = () => {
    window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&scope=user-read-private%20user-read-currently-playing%20user-top-read&response_type=token&show_dialog=true`;
  };

  const { isValidSession, location } = props;
  const { state } = location;
  const sessionExpired = state && state.session_expired;

  return (
    <React.Fragment>
      {isValidSession() ? (
        <Redirect to="/dashboard" />
      ) : (
        <div className="login">
          <Header />
          {sessionExpired && (
            <Alert severity="info">Session expired. Please login again.</Alert>
          )}
          <Button variant="outlined" type="submit" onClick={handleLogin}>
            Login to Spotify
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default connect()(Home);
