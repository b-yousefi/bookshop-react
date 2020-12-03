import { BOOK_ACTIONS } from "../actions/actions_book";

const INITIAL_STATE = {
  map: null,
  filter: null,
  refreshing: false,
};

export function BooksReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case BOOK_ACTIONS.FILTER:
      if (
        action.payload.data._embedded &&
        action.payload.data._embedded.books
      ) {
        const books = action.payload.data._embedded.books;
        const map = new Map(books.map((book) => [book.id, book]));
        return { map, filter: action.filter, page: action.payload.data.page };
      } else {
        return { map: null, filter: action.filter };
      }
    case BOOK_ACTIONS.FETCH:
      const book = action.payload.data;
      let map = state ? new Map(state.map) : new Map();
      map.set(book.id, book);
      return { map, filter: null };
    case BOOK_ACTIONS.REFRESHING:
      return { ...state, refreshing: action.refreshing };
    default:
      return state;
  }
}
