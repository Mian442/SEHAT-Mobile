import * as ActionList from "../actions/ActionsList";
const initialState = {
  Lang: null,
  status: false,
  IS_ENGLISH: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionList.LANGUAGE:
      return { ...state, Lang: payload };
    case ActionList.LANGUAGE_STATUS:
      return { ...state, status: true };
    case ActionList.IS_ENGLISH:
      return { ...state, IS_ENGLISH: payload };

    default:
      return state;
  }
};
