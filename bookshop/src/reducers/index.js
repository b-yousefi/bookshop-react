import { combineReducers } from 'redux';
import { UserReducer } from './reducer_user';
import { CategoriesReducer } from './reducer_categories';
import { NotificationReducer } from './reducer_notification';
import { FlatCategoriesReducer } from './reducer_flatCategories';
import { AuthorsReducer } from './reducer_authors';
import { PublicationReducer } from './reducer_publications';
import { BooksReducer } from './reducer_books';
import { FilterReducer } from './reducer_filter';

const RootReducer = combineReducers(
    {
        user: UserReducer,
        categories: CategoriesReducer,
        notification: NotificationReducer,
        categories_flat: FlatCategoriesReducer,
        authors: AuthorsReducer,
        publications: PublicationReducer,
        books: BooksReducer,
        filter: FilterReducer,
    }
)

export default RootReducer;