export const addProductToCart = (product) => ({
  type: "ADD_PRODUCT_TO_CART",
  product: product,
});

export const deleteProductFromCart = (product) => ({
  type: "DELETE_PRODUCT_FROM_CART",
  product: product,
});

export const increaseCounter = () => ({
  type: "INCREASE_COUNTER",
});
export const decreaseCounter = () => ({
  type: "DECREASE_COUNTER",
});
