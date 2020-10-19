export const setToken = (token) => ({
  type: "SET_TOKEN",
  token: token,
});

export const deleteToken = () => ({
  type: "DELETE_TOKEN",
});

export const setUsers = (users) => ({
  type: "SET_USERS",
  users: users,
});
export const setUser = (user) => ({
  type: "SET_USER",
  user: user,
});

export const setID = (id) => ({
  type: "SET_ID",
  id: id,
});

export const authTrue = () => ({
  type: "AUTH_TRUE",
});

export const authFalse = () => ({
  type: "AUTH_FALSE",
});
