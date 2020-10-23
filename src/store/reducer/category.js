const initialState = {
  category: "",
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CATEGORY_TO_SHOW":
      return {
        category: action.category,
      };
    case "RESET_CATEGORY":
      return {
        category: "All",
      };
    default:
      return state;
  }
};

export default categoryReducer;
