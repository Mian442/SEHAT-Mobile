import { createStore, applyMiddleware, compose } from "redux";
import MainReducer from "../reducer/MainReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "remote-redux-devtools";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhance = composeWithDevTools({
  realtime: true,
  host: "localhost",
  port: 8000,
});

const MianStore = createStore(MainReducer, applyMiddleware(thunk));

export default MianStore;
