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
  const url = 'https://api.spotify.com/v1/me/player/play';
  const data = {
    context_uri: uri,
  };
  setAuthHeader();
  const result = await axios.put(url, data);
  return result.data;
};

export const image_get = async (url, auth) => {
  const { REACT_APP_IMAGGA_BASIC } = process.env;
  axios.defaults.headers.common['Authorization'] = REACT_APP_IMAGGA_BASIC;

  const result = await axios.get(url, auth);

  return result.data;
};
