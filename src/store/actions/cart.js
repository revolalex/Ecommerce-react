export const addProductToCart = (product) => ({
  type: "ADD_PRODUCT_TO_CART",
  productBasket: product,
});

export const deleteProductFromCart = (product) => ({
  type: "DELETE_PRODUCT_FROM_CART",
  productBasket: product,
});
export const resetCart = ()=>({
  type: "RESET_CART"
})


  // Not use 
  export const increaseCounter = (product) => ({
    type: "INCREASE_COUNTER",
    productBasket: product,
  });
  export const decreaseCounter = (product) => ({
    type: "DECREASE_COUNTER",
    productBasket: product,
  });

