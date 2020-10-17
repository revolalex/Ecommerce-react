const initialState = {
  productBasket: [],
  counter: 0,
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART":
    console.log(state.total);
      return {
        ...state,
        total: state.total + action.productBasket.prices,
        productBasket: [...state.productBasket, action.productBasket],
      };
    case "DELETE_PRODUCT_FROM_CART":
      return {
        ...state,
        total: state.total - action.productBasket.prices,
        productBasket: state.productBasket.filter(
          (product) => product !== action.productBasket
        ),
      };
      case "RESET_CART":
        return {
          ...state,
          total: 0,
        };


    // not use
    case "INCREASE_COUNTER":
      return {
        ...state,
        counter: state.counter + 1,
      };
    case "DECREASE_COUNTER":
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};

export default cartReducer;
