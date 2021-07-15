import * as ActionList from "../actions/ActionsList";
const initialState = {
  prediction: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionList.PREDICTION:
      return { ...state, prediction: payload };
    default:
      return state;
  }
};
