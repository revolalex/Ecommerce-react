const initialStates = {
  token: "",
  users: [],
};

const userReducer = (state = initialStates, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "DELETE_TOKEN":
      return {
        ...state,
        token: "",
      };
    case "SET_USERS":
      return {
          ...state,
          users: action.users
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
