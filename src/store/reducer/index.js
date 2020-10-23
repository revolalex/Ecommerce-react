import { combineReducers } from "redux";
import userReducer from "./user";
import productReducer from "./product";
import cartReducer from "./cart"
import ordersReducer from './orders'
import categoryReducer from "./category"

export default combineReducers({
  userReducer,
  productReducer,
  cartReducer,
  ordersReducer,
  categoryReducer
});
