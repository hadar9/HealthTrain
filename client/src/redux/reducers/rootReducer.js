import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";
import storage from "redux-persist/lib/storage"; // for local storage use
import userSlice from "./UserReducer";
import workoutSlice from "./workoutReducer";
import userdataSlice from "./UserDataReducer";
//or
// import storageSession from 'redux-persist/lib/storage/session' // for session storage

const reducer = combineReducers({
  workoutReducer: workoutSlice,
  userReducer: userSlice,
  UserDataReducer: userdataSlice,
});

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["userReducer", "workoutReducer"] // only rootReducer will be persisted
  // blacklist: [] // reducer that wont be persisted
};

const persistedReducers = persistReducer(persistConfig, reducer);

export default persistedReducers;
