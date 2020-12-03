import { SHOPPING_CART_ACTIONS } from "../actions/actions_shopping_cart";

function computeTotalPrice(orderItems) {
  let totalPrice = 0;
  orderItems.forEach((orderItem, key) => {
    totalPrice += orderItem.quantity * parseFloat(orderItem.book.price);
  });
  return totalPrice.toFixed(2);
}

export function ShoppingCartReducer(state = null, action) {
  switch (action.type) {
    case SHOPPING_CART_ACTIONS.FETCH:
      const shopping_cart = action.payload.data;
      let booksMap = new Map(
        [...shopping_cart.orderItems].map((orderItem) => [
          orderItem.book.id,
          {
            book: orderItem.book,
            count: orderItem.quantity,
            orderItemId: orderItem.id,
          },
        ])
      );
      let orderItemsMap = new Map(
        [...shopping_cart.orderItems].map((orderItem) => [
          orderItem.id,
          orderItem,
        ])
      );
      return { ...action.payload.data, booksMap, orderItems: orderItemsMap };
    case SHOPPING_CART_ACTIONS.ADD:
    case SHOPPING_CART_ACTIONS.UPDATE: {
      const { data } = action.payload;
      let id = data.id;
      let uOrderItems = new Map(state.orderItems);
      let uBooksMap = new Map(state.booksMap);

      uOrderItems.set(id, data);
      uBooksMap.set(data.book.id, {
        book: data.book,
        count: data.quantity,
        orderItemId: data.id,
      });

      const totalPrice = computeTotalPrice(uOrderItems);
      return {
        ...state,
        orderItems: uOrderItems,
        booksMap: uBooksMap,
        totalPrice,
      };
    }
    case SHOPPING_CART_ACTIONS.DELETE: {
      const deletedOrderItemId = action.orderItemId;
      const deletedOrderItemBookId = action.orderItemBookId;
      let uOrderItems = new Map(state.orderItems);
      let uBooksMap = new Map(state.booksMap);
      uOrderItems.delete(deletedOrderItemId);
      uBooksMap.delete(deletedOrderItemBookId);
      const totalPrice = computeTotalPrice(uOrderItems);
      return {
        ...state,
        orderItems: uOrderItems,
        booksMap: uBooksMap,
        totalPrice,
      };
    }
    default:
      return state;
  }
}
