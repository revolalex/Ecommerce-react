const initialState = {
  products: [],
  product: {},
  id: "",
  productIdToEdit: 0,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LIST_OF_PRODUCTS":
      return {
        ...state,
        products: action.products,
      };
    case "SET_PRODUCT":
      return {
        ...state,
        product: action.product,
      };
    case "SET_ID_PRODUCT":
      return {
        ...state,
        id: action.id,
      };
    case "PRODUCT_ID_TO_EDIT":
      return {
        ...state,
        productIdToEdit: action.id,
      };
    default:
      return state;
  }
};

export default productReducer;
