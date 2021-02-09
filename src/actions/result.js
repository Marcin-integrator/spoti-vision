import {
  SET_ALBUMS,
  ADD_ALBUMS,
  SET_ARTISTS,
  ADD_ARTISTS,
  SET_PLAYLIST,
  ADD_PLAYLIST,
  GET_USER,
  GET_USERS_TOP,
  GET_CURR,
} from '../utils/constants';
import { get } from '../utils/api';

export const setAlbums = albums => ({
  type: SET_ALBUMS,
  albums,
});

export const addAlbums = albums => ({
  type: ADD_ALBUMS,
  albums,
});

export const setArtists = artists => ({
  type: SET_ARTISTS,
  artists,
});

export const addArtists = artists => ({
  type: ADD_ARTISTS,
  artists,
});

export const setPlaylist = playlists => ({
  type: SET_PLAYLIST,
  playlists,
});

export const addPlaylist = playlists => ({
  type: ADD_PLAYLIST,
  playlists,
});

export const getUser = user => ({
  type: GET_USER,
  user,
});

export const getUsersTop = user => ({
  type: GET_USERS_TOP,
  user,
});

export const getCurr = track => ({
  type: GET_CURR,
  track,
});

export const initiateGetResult = searchTerm => {
  return async dispatch => {
    try {
      const API_URL = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        searchTerm
      )}&type=album,playlist,artist`;
      const result = await get(API_URL);
      const { albums, artists, playlists } = result;
      dispatch(setAlbums(albums));
      dispatch(setArtists(artists));
      return dispatch(setPlaylist(playlists));
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const initiateLoadMoreAlbums = url => {
  return async dispatch => {
    try {
      const result = await get(url);
      return dispatch(addAlbums(result.albums));
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const initiateLoadMoreArtists = url => {
  return async dispatch => {
    try {
      const result = await get(url);
      return dispatch(addArtists(result.artists));
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const initiateLoadMorePlaylist = url => {
  return async dispatch => {
    try {
      const result = await get(url);
      return dispatch(addPlaylist(result.playlists));
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const initiateGetUser = () => {
  return async dispatch => {
    try {
      const API_URL = `https://api.spotify.com/v1/me`;
      const result = await get(API_URL);
      return dispatch(getUser(result));
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const initiateGetUsersTop = type => {
  return async dispatch => {
    try {
      const API_URL = `https://api.spotify.com/v1/me/top/${type}`;
      const result = await get(API_URL);
      console.log(result);
      return dispatch(getUsersTop(result));
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const initiateGetCurrTrack = () => {
  return async dispatch => {
    try {
      const API_URL = `https://api.spotify.com/v1/me/player/currently-playing`;
      const result = await get(API_URL);
      console.log(result);
      return dispatch(getCurr(result));
    } catch (error) {
      console.log('error', error);
    }
  };
};
