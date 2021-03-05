import { React, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from '../components/Dashboard';
import Home from '../components/Home';
import NotFoundPage from '../components/NotFoundPage';
import RedirectPage from '../components/RedirectPage';
import Visualizer from '../components/Visualizer';
import RedirectRoute from './RedirectRoute';

const AppRouter = () => {
  const [expiryTime, setExpiryTime] = useState('0');

  useEffect(() => {
    let time;
    try {
      time = JSON.parse(localStorage.getItem('expiry_time'));
    } catch (error) {
      time = '0';
    }
    setExpiryTime(time);
  }, []);

  const setTime = timeUpdate => {
    setExpiryTime(timeUpdate);
  };

  const isValidSession = () => {
    const currentTime = new Date().getTime();
    const isSessionValid = currentTime < expiryTime;
    return isSessionValid;
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          render={props => <Home isValidSession={isValidSession} {...props} />}
        />
        <Route
          path="/redirect"
          render={props => (
            <RedirectPage
              isValidSession={isValidSession}
              setTime={setTime}
              {...props}
            />
          )}
        />
        <RedirectRoute path="/dashboard" isValidSession={isValidSession}>
          <Dashboard isValidSession={isValidSession} />
        </RedirectRoute>
        <RedirectRoute path="/visualizer" isValidSession={isValidSession}>
          <Visualizer isValidSession={isValidSession} />
        </RedirectRoute>
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
