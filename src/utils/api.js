import axios from 'axios';
import { setAuthHeader } from './functions';

export const get = async (url, params) => {
  setAuthHeader();
  const result = await axios.get(url, params);
  return result.data;
};

export const post = async (url, params) => {
  setAuthHeader();
  const result = await axios.post(url, params);
  return result.data;
};

export const put = async uri => {
  const devices = await active_player();
  if (devices.length === 0) {
    return;
  } else {
    const url = 'https://api.spotify.com/v1/me/player/play';
    const data = {
      context_uri: uri,
    };
    setAuthHeader();
    const result = await axios.put(url, data);
    console.log(result.data);
    // add devices to data
    return result.data;
  }
};

export const image_get = async (url, auth) => {
  const { REACT_APP_IMAGGA_BASIC } = process.env;
  axios.defaults.headers.common['Authorization'] = REACT_APP_IMAGGA_BASIC;

  const result = await axios.get(url, auth);

  return result.data;
};

export const active_player = async () => {
  setAuthHeader();
  const url = 'https://api.spotify.com/v1/me/player/devices';
  const result = await axios.get(url);
  console.log(result.data.devices);
  return result.data.devices;
};
