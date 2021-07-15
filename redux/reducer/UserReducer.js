import * as ActionList from "../actions/ActionsList";
const initialState = {
  IS_LOGGED: false,
  TOKEN: null,
  info: null,
  chat: [],
  message: null,
  vitals: null,
  wallet: null,
  favorite: [],
  favoriteList: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionList.IS_LOGGED_IN:
      return { ...state, IS_LOGGED: true };
    case ActionList.IS_LOGGED_OUT:
      return { ...state, IS_LOGGED: false };
    case ActionList.USER_TOKEN:
      return { ...state, TOKEN: payload };
    case ActionList.USER_INFORMATION:
      return { ...state, info: payload };
    case ActionList.CHAT_LIST:
      return { ...state, chat: payload };
    case ActionList.MESSAGE_LIST:
      return { ...state, message: payload };
    case ActionList.USER_VITAL:
      return { ...state, vitals: payload };
    case ActionList.WALLET:
      return { ...state, wallet: payload };
    case ActionList.FAVORITE:
      return { ...state, favorite: payload };
    case ActionList.FAVORITE_LIST:
      return { ...state, favoriteList: payload };
    default:
      return state;
  }
};
