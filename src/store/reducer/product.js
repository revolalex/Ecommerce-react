const initialStates = {
    products: [],
  };
  
  const productReducer = (state = initialStates, action) => {
    switch (action.type) {
      case "SET_PRODUCTS":
        return {
            products: action.products

        };
      default:
        return {
          ...state,
        };
    }
  };
  
  export default productReducer;