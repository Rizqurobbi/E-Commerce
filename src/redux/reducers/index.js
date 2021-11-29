import { combineReducers } from "redux";
import { productsReducer } from "./productReducers";
import { userReducer } from "./userReducer";
export const rootReducers = combineReducers({
    userReducer,
    productsReducer
})