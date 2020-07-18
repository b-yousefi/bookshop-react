import {createSelector} from 'reselect';

const getByCategoryById = (state, categoryId) => state.categories_flat ?
    state.categories_flat[categoryId] : undefined;

export const makeGetCategory = () => {
    return createSelector(
        [getByCategoryById],
        (category) => {
            return category;
        }
    )
}

const getAuthorById = (state, authorId) => state.authors ?
    state.authors.get(authorId) : undefined;

export const makeGetAuthor = () => {
    return createSelector(
        [getAuthorById],
        (author) => {
            return author;
        }
    )
}

const getBookById = (state, bookId) => state.books ?
    state.books.get(bookId) : undefined;

export const makeGetBook = () => {
    return createSelector(
        [getBookById],
        (book) => {
            return book;
        }
    )
}

const getPublicationById = (state, publicationId) => state.publications ?
    state.publications.get(publicationId) : undefined;

export const makeGetPublication = () => {
    return createSelector(
        [getPublicationById],
        (publication) => {
            return publication;
        }
    )
}

export const getShoppingCartItemsCount = (state) => state.shopping_cart ?
    state.shopping_cart.orderItems.length : 0;

export const getBooksInShoppingCart = (state) => {
    if (state.shopping_cart) {
        return state.shopping_cart.booksMap;
    } else
        return null;
}