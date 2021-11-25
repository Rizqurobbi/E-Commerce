import { combineReducers } from "redux";
import { productReducer } from "./productReducers";
import { userReducer } from "./userReducer";
export const rootReducers = combineReducers({
    userReducer,
    productReducer
})