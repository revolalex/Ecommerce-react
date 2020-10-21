export const setHistoryOrders = (orders) => ({
  type: "SET_HISTORY_ORDERS",
  old_Orders: orders,
});

export const resetHistoryOrders = () => ({
  type: " RESET_HYSTORY_ORDERS",
});
