import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "remote-redux-devtools";

import { bluetoothReducer } from "./bluetooth";
import { heartReducer } from "./heart";
import { logReducer } from "./log";
import { syncReducer } from "./sync";

const storeMiddleware = [thunk];

const rootReducer = combineReducers({
  log: logReducer,
  bluetooth: bluetoothReducer,
  heart: heartReducer,
  sync: syncReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...storeMiddleware))
);

export default store;
export * from "./store.types";
