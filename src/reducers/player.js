import { GET_COVER, GET_CURR } from '../utils/constants';

const playerReducer = (state = {}, action) => {
  const { track, cover } = action;
  switch (action.type) {
    case GET_CURR:
      return track;
    case GET_COVER:
      return {
        ...state,
        cover: { ...cover },
      };
    default:
      return state;
  }
};

export default playerReducer;
