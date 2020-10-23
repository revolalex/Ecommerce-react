import { combineReducers } from "redux";
import userReducer from './user'
import productReducer from "./product"
import cartReducer from './cart'
import categoryReducer from './category'

export default combineReducers({
    userReducer,
    productReducer,
    cartReducer,
    categoryReducer
})