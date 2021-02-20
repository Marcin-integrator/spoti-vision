import { get, image_get } from '../utils/api';
import {
  SET_ALBUMS,
  ADD_ALBUMS,
  SET_ARTISTS,
  ADD_ARTISTS,
  SET_PLAYLIST,
  ADD_PLAYLIST,
  GET_USER,
  GET_USERS_TOP_ARTISTS,
  GET_USERS_TOP_TRACKS,
  GET_CURR,
  GET_COVER,
} from '../utils/constants';

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

export const getUsersTop = top => {
  if (top[0]?.artists) {
    return {
      type: GET_USERS_TOP_TRACKS,
      top,
    };
  } else {
    return {
      type: GET_USERS_TOP_ARTISTS,
      top,
    };
  }
};

export const getCurr = track => ({
  type: GET_CURR,
  track,
});

export const getCover = cover => ({
  type: GET_COVER,
  cover,
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
      const API_URL = `https://api.spotify.com/v1/me/top/${type}?time_range=long_term&limit=5`;
      const result = await get(API_URL);
      return dispatch(getUsersTop(result.items));
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
      result.timer = result.item.duration_ms - result.progress_ms;
      return dispatch(getCurr(result));
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const getCoverImage = imageUrl => {
  const { REACT_APP_IMAGGA_KEY, REACT_APP_IMAGGA_SECRET } = process.env;
  return async dispatch => {
    try {
      const API_URL = `https://api.imagga.com/v2/colors?image_url=${encodeURIComponent(
        imageUrl
      )}`;

      const body = {
        username: REACT_APP_IMAGGA_KEY,
        password: REACT_APP_IMAGGA_SECRET,
      };

      const result = await image_get(API_URL, body);
      return dispatch(getCover(result));
    } catch (error) {
      console.log('error', error);
    }
  };
};
