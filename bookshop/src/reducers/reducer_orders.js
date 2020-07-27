import {ORDER_ACTIONS} from '../actions/actions_order';


export function OrdersReducer(state = null, action) {
    switch (action.type) {
        case ORDER_ACTIONS.FETCH_ALL:
            if (action.payload.data._embedded && action.payload.data._embedded.orders) {
                const orders = action.payload.data._embedded.orders;
                return {map: new Map(orders.map(order => [order.id, order])), page: action.payload.data.page};
            } else {
                return null;
            }
        case ORDER_ACTIONS.FETCH:
            const order = action.payload.data;
            const id = Number(order._links.self.href.split("/").reverse()[0]);
            const map = new Map(state.map);
            map.set(id, order);
            return {...state, map};
        default:
            return state;
    }
}