import {SHOPPING_CART_ACTIONS} from '../actions/actions_shopping_cart';


export function ShoppingCartReducer(state = null, action) {
    switch (action.type) {
        case SHOPPING_CART_ACTIONS.FETCH:
            const shopping_cart = action.payload.data;
            let booksMap = new Map(shopping_cart.orderItems.map(orderItem => [orderItem.bookId, {
                count: orderItem.quantity, orderItemId:
                orderItem.id
            }]));
            return {...action.payload.data, booksMap};
        case SHOPPING_CART_ACTIONS.ADD_ITEM:
            return state;
        default:
            return state;
    }
}