export const setListOfProducts = (products) => ({
  type: "SET_LIST_OF_PRODUCTS",
  products: products,
});

export const setProduct = (product) => ({
  type: "SET_PRODUCT",
  product: product,
});

export const setIdProduct = (id) => ({
  type: "SET_ID_PRODUCT",
  id: id,
});

export const productIdToEdit = (id) => ({
  type: "PRODUCT_ID_TO_EDIT",
  productIdToEdit: id,
});
