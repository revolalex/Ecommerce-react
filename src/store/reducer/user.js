const initialStates = {
    token: "",
    users: [],
    user:{},
    id: "",
    auth: false
}

const userReducer = (state = initialStates,action) => {
    switch (action.type) {
        case "SET_TOKEN":    
        return {
            ...state,
            token: action.token
        };
        case "DELETE_TOKEN":
        return{
            ...state,
            token: ""
        };
        case "SET_USERS":
        return{
            ...state,
            users: action.users
        }
        case "SET_ID":
            return{
                ...state,
                id: action.id
            }
        case "AUTH_TRUE":
            return{
                ...state,
                auth: true
            }
        case "AUTH_FALSE":
            return{
                ...state,
                auth: false
            }
        default:
            return state                 
    }
}

export default userReducer