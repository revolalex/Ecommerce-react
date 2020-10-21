const initialStates = {
  old_Orders: [],
};

const ordersReducer = (state = initialStates, action) => {
  switch (action.type) {
    case "SET_HISTORY_ORDERS":
      return {
        old_Orders: action.old_Orders,
      };
    case "RESET_HYSTORY_ORDERS":
      return {
        old_Orders: [],
      };
    default:
      return state;
  }
};

export default ordersReducer;
