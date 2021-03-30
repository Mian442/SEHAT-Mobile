import { combineReducers } from "redux";
import SearchReducer from "./SearchReducer";
import UserReducer from "./UserReducer";
import LanguageReducer from "./LanguageReducer";
import DoctorReducer from "./DoctorReducer";

export default combineReducers({
  Search: SearchReducer,
  User: UserReducer,
  Doctor: DoctorReducer,
  Language: LanguageReducer,
});
