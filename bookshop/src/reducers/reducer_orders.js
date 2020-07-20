import {ORDER_ACTIONS} from '../actions/actions_order';


export function OrdersReducer(state = null, action) {
    switch (action.type) {
        case ORDER_ACTIONS.FETCH:
            if (action.payload.data._embedded && action.payload.data._embedded.orders) {
                const orders = action.payload.data._embedded.orders;
                return new Map(orders.map(order => [order.id, order]));
            } else {
                return null;
            }
        default:
            return state;
    }
}