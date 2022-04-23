import { combineReducers } from "redux";
import { miscReducer } from "./misc"
import { authReducer } from "./auth"
import { websocketsReducer } from "./websockets"
import { feedReducer } from "./feed"

export const rootReducer = combineReducers({
    miscList: miscReducer,
    auth: authReducer,
    websockets: websocketsReducer,
    feed: feedReducer
}); 