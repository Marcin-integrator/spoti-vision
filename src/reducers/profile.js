import { GET_USER, GET_USERS_TOP } from '../utils/constants';

const profileReducer = (state = {}, action) => {
  const { user } = action;

  switch (action.type) {
    case GET_USER:
      return user;
    case GET_USERS_TOP:
      return {
        ...state,
        items: [...state.items, ...user.items],
      };
    default:
      return state;
  }
};

export default profileReducer;
