import { Redirect, Route } from 'react-router-dom';

const RedirectRoute = props => {
  const { children, isValidSession, location } = props;

  return (
    <Route
      render={() =>
        isValidSession() ? (
          children
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
        )
      }
    />
  );
};

export default RedirectRoute;
