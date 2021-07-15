import * as ActionList from "../actions/ActionsList";
const initialState = {
  msg: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionList.MESSAGE:
      return { ...state, msg: payload };
    case ActionList.MESSAGE_NULL:
      return { ...state, msg: null };

    default:
      return state;
  }
};
