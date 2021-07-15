import * as ActionList from "../actions/ActionsList";

const initialState = {
  search: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionList.SEARCH:
      return { ...state, search: payload };
    case ActionList.SEARCH_NULL:
      return { ...state, search: null };
    default:
      return state;
  }
};
