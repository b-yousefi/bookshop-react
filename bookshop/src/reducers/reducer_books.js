
import { BOOK_ACTIONS } from '../actions/actions_book';


export function BooksReducer(state = null, action) {
    switch (action.type) {
        case BOOK_ACTIONS.FILTER:
            if (action.payload.data._embedded && action.payload.data._embedded.books) {
                const books = action.payload.data._embedded.books;
                const map = new Map(books.map(book => [book.id, book]));
                const filter = action.filter;
                return Object.assign(map, { filter: filter });
            } else {
                return null;
            }
        default:
            return state;
    }
}