import { GET_AUDIO_DETAILS, GET_COVER, GET_CURR } from '../utils/constants';

const playerReducer = (state = {}, action) => {
  const { audio, track, cover } = action;
  switch (action.type) {
    case GET_CURR:
      return track;
    case GET_AUDIO_DETAILS:
      return {
        ...state,
        audio: { ...audio },
      };
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
