import * as Actionlist from "../actions/ActionsList";

const initialState = {
  search: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case Actionlist.SEARCH:
      return { ...state, search: payload };
    case Actionlist.SEARCH_NULL:
      return { ...state, search: null };
    default:
      return state;
  }
};
