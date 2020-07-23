import {BOOK_ACTIONS} from '../actions/actions_book';


export function BooksReducer(state = null, action) {
    switch (action.type) {
        case BOOK_ACTIONS.FILTER:
            if (action.payload.data._embedded && action.payload.data._embedded.books) {
                const books = action.payload.data._embedded.books;
                const map = new Map(books.map(book => [book.id, book]));
                return {map, filter: action.filter, page: action.payload.data.page};
            } else {
                return {map: null, filter: action.filter};
            }
        case BOOK_ACTIONS.FETCH:
            const book = action.payload.data;
            let map = state ? new Map(state.map) : new Map();
            map.set(book.id, book);
            return {map, filter: null};
        default:
            return state;
    }
}