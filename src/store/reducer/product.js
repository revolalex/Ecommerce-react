const initialState = {
  products: [],
  product: {},
  id: "",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LIST_OF_PRODUCTS":
      return {
        ...state,
        products: action.products,
      };
    case "SET_PRODUCT_CLICK":
      return {
        ...state,
        product: action.product,
      };
    case "SET_ID_PRODUCT":
      return {
        ...state,
        id: action.id,
      };
    default:
      return state;
  }
};

export default productReducer;
