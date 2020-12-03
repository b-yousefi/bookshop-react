import {ADDRESS_ACTIONS} from '../actions/action_address';

export function AddressesReducer(state = null, action) {
    switch (action.type) {
        case ADDRESS_ACTIONS.FETCH:
            const addresses = action.payload.data._embedded.addresses;
            const map = new Map(addresses.map(i => {
                    const id = i._links.self.href.split("/").reverse()[0];
                    return [id, {...i, id}];
                }
            ));
            return {map};
        case ADDRESS_ACTIONS.UPDATE:
        case ADDRESS_ACTIONS.CREATE:
            const address = action.payload.data;
            const id = address._links.self.href.split("/").reverse()[0];
            let newAddresses = new Map(state.map);
            newAddresses.set(id, address);
            return {map: newAddresses};
        case ADDRESS_ACTIONS.DELETE:
            const deletedAddress = action.id;
            let afterDelete = new Map(state.map);
            afterDelete.delete(deletedAddress);
            return {map: afterDelete};
        default:
            return state;
    }
}