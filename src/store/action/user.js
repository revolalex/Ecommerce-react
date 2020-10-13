export const setToken = (token) => ({
    type: "SET_TOKEN",
    token: token
})

export const deleteToken = () => ({
    type: "DELETE_TOKEN",
    token: ""
})

export const setUsers = (users) => ({
    type: "SET_USERS",
    users: users
})