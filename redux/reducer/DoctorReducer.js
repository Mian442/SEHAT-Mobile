import * as ActionList from "../actions/ActionsList";
const initialState = {
  allDoctor: [],
  info: null,
  status: null,
};

export default (state = initialState, { type, payload }) => {
  console.log(type);
  switch (type) {
    case ActionList.DOCTORS:
      return { ...state, allDoctor: payload };
    case ActionList.DOCTOR_INFORMATION:
      return { ...state, info: payload };
    case ActionList.DOCTORS_STATUS:
      return { ...state, status: payload };
    default:
      return state;
  }
};
