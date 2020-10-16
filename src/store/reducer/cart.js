const initialState = {
  productBasket: [],
  totalPriceCart: 0,
  counter: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART":
      return {
        ...state,
        productBasket: [...state.productBasket, action.productBasket ]
      };
    case "DELETE_PRODUCT_FROM_CART":
      return {
        ...state,
        productBasket: action.productBasket,
      };
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
