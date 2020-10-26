const initialState = {
    productBasket: [],
    total: 0,
  };
let item = {}
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART":
      item =  state.productBasket.find(element => element.id === action.productBasket.id)
      if (item === undefined){
        action.productBasket.quantity = 1
        return {
            total: state.total + (action.productBasket.promotionIsActive ? action.productBasket.promotion : action.productBasket.prices),
            productBasket: [...state.productBasket, action.productBasket],
          };
        }else{
          item.quantity += 1
          return {
            ...state,
            total: state.total + (action.productBasket.promotionIsActive ? action.productBasket.promotion : action.productBasket.prices),
            productBasket: [...state.productBasket]
          }
        }
      case "DELETE_PRODUCT_FROM_CART":
        return {
          total: state.total - ((action.productBasket.promotionIsActive ? action.productBasket.promotion : action.productBasket.prices) * action.productBasket.quantity),
          productBasket: state.productBasket.filter(
            (product) => product !== action.productBasket
          ),
        };
      case "RESET_CART":
          return {
            ...state,
            total: 0,
          };
      case "INCREASE_COUNTER":
      item = state.productBasket.find(element => element.id === action.productBasket.id)
          item.quantity += 1
          return {
            total: state.total + (action.productBasket.promotionIsActive ? action.productBasket.promotion : action.productBasket.prices),
            productBasket: [...state.productBasket]
          }
      case "DECREASE_COUNTER":
      item = state.productBasket.find(element => element.id === action.productBasket.id)
          if(item.quantity === 1){
            return {
              total: state.total - ( (action.productBasket.promotionIsActive ? action.productBasket.promotion : action.productBasket.prices) * action.productBasket.quantity),
              productBasket: state.productBasket.filter(
                (product) => product !== action.productBasket
              ),
            };
          }else{
          item.quantity -= 1
          return {
            total: state.total - (action.productBasket.promotionIsActive ? action.productBasket.promotion : action.productBasket.prices),
            productBasket: [...state.productBasket]
          }}
      default:
        return state;
    }
  };
  
  export default cartReducer;