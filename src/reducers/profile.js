import {
  GET_USER,
  GET_USERS_TOP_ARTISTS,
  GET_USERS_TOP_TRACKS,
} from '../utils/constants';

const profileReducer = (state = {}, action) => {
  const { user, top } = action;
  switch (action.type) {
    case GET_USER:
      return user;
    case GET_USERS_TOP_ARTISTS:
      return {
        ...state,
        artists: [...top],
      };
    case GET_USERS_TOP_TRACKS:
      return {
        ...state,
        tracks: [...top],
      };
    default:
      return state;
  }
};

export default profileReducer;
