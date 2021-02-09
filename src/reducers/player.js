import { GET_CURR } from '../utils/constants';

const playerReducer = (state = {}, action) => {
  const { track } = action;

  switch (action.type) {
    case GET_CURR:
      return track;
    default:
      return state;
  }
};

export default playerReducer;
