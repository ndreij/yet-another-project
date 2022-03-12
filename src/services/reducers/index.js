import { combineReducers } from "redux";
import { miscReducer } from "./misc"
import { authReducer } from "./authreducers"

export const rootReducer = combineReducers({
    miscList: miscReducer,
    auth: authReducer
}); 