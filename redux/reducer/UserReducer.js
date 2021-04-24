import * as ActionList from "../actions/ActionsList";
const initialState = {
  ISLOGGED: false,
  TOKKEN: null,
  info: null,
  chat: [],
  message: null,
  vitals: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionList.IS_LOGGED_IN:
      return { ...state, ISLOGGED: true };
    case ActionList.IS_LOGGED_OUT:
      return { ...state, ISLOGGED: false };
    case ActionList.USER_TOKEN:
      return { ...state, TOKKEN: payload };
    case ActionList.USER_INFORMATION:
      return { ...state, info: payload };
    case ActionList.CHAT_LIST:
      return { ...state, chat: payload };
    case ActionList.MESSAGE_LIST:
      return { ...state, message: payload };
    case ActionList.USER_VITAL:
      return { ...state, vitals: payload };
    default:
      return state;
  }
};
