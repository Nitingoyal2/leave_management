import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import Authentication from "./Authentication";
import { persistReducer, persistStore } from "redux-persist";

const reducers = combineReducers({
  Authlogin: Authentication,
});
const persistConfig = {
  key: "0.1",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
});
export default store;
export const persistor = persistStore(store);
