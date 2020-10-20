const initialState = {
    productBasket: [],
    total: 0,
  };
  
  const cartReducer = (state = initialState, action) => {
    let item = state.productBasket.find(element => element.id === action.productBasket.id)
    switch (action.type) {
      case "ADD_PRODUCT_TO_CART":
      if (item === undefined){
          action.productBasket.quantity = 1
          return {
            ...state,
            total: state.total + action.productBasket.prices,
            productBasket: [...state.productBasket, action.productBasket],
          };
        }else{
          item.quantity += 1
          return {
            ...state,
            total: state.total + action.productBasket.prices,
            product: [...state.productBasket]
          }
        }
      case "DELETE_PRODUCT_FROM_CART":
        return {
          ...state,
          total: state.total - ( action.productBasket.prices * action.productBasket.quantity),
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
          item.quantity += 1
          return {
            ...state,
            total: state.total + action.productBasket.prices,
            product: [...state.productBasket]
          }
      case "DECREASE_COUNTER":
          item.quantity -= 1
          return {
            ...state,
            total: state.total - action.productBasket.prices,
            product: [...state.productBasket]
          }
      default:
        return state;
    }
  };
  
  export default cartReducer;