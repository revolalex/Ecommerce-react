const initialState = {
    products: []
}

const productReducer = (state = initialState,action) => {
    switch (action.type) {
        case "SET_PRODUCT":
            return{
                ...state,
                products: action.product
            }            
        default:
            return  state;
    }
}

export default productReducer