import { combineReducers } from "@reduxjs/toolkit";
import eBarStoreReducer from "./e-barStore/reducer";

const rootReducer = combineReducers({
  eBarStore: eBarStoreReducer,
});

export default rootReducer;
