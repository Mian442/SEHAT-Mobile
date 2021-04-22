import * as ActionList from "../actions/ActionsList";
const initialState = {
  allDoctor: [],
  info: null,
  status: null,
  category_list: [],
  review: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionList.DOCTORS:
      return { ...state, allDoctor: payload };
    case ActionList.DOCTOR_INFORMATION:
      return { ...state, info: payload };
    case ActionList.DOCTORS_STATUS:
      return { ...state, status: payload };
    case ActionList.CATEGORY_LIST:
      return { ...state, category_list: payload };
    case ActionList.REVIEW:
      return { ...state, review: payload };
    default:
      return state;
  }
};
