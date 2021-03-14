import axios from 'axios';

export const getParamValues = url => {
  return url
    .slice(1)
    .split('&')
    .reduce((prev, curr) => {
      const [title, value] = curr.split('=');
      prev[title] = value;
      return prev;
    }, {});
};

export const setAuthHeader = () => {
  try {
    const params = JSON.parse(localStorage.getItem('params'));
    if (params) {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${params.access_token}`;
    }
  } catch (error) {
    console.log('Error setting auth', error);
  }
};

export const sessionExpired = (history, pathname) => {
  history.push({
    pathname: '/',
    state: {
      session_expired: true,
      whereTo: pathname,
    },
  });
};

export const progressCounter = duration => {
  duration = duration / 1000;
  let minutes = Math.floor(duration / 60);
  let seconds = Math.round(duration % 60);
  if (seconds === 60) {
    ++minutes;
    seconds = 0;
  }
  const fixedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const timer = `${minutes} : ${fixedSeconds}`;
  return timer;
};
