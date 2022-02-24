import { combineReducers } from "redux";
import { miscReducer } from "./misc"

export const rootReducer = combineReducers({
    miscList: miscReducer
}); 