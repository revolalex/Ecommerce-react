import { combineReducers } from "redux";
import userReducer from './user'
import productReducer from "./product"

export default combineReducers({
    userReducer,
    productReducer
})