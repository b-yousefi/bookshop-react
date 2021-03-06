import {combineReducers} from 'redux';
import {UserReducer} from './reducer_user';
import {CategoriesReducer} from './reducer_categories';
import {NotificationReducer} from './reducer_notification';
import {FlatCategoriesReducer} from './reducer_flatCategories';
import {AuthorsReducer} from './reducer_authors';
import {PublicationReducer} from './reducer_publications';
import {BooksReducer} from './reducer_books';
import {FilterReducer} from './reducer_filter';
import {SelectedAuthorReducer} from './reducer_selected_author';
import {SelectedCategoryReducer} from './reducer_selected_category';
import {SelectedPublicationReducer} from './reducer_selected_publication';
import {OrdersReducer} from './reducer_orders';
import {ShoppingCartReducer} from './reducer_shopping_cart';
import {AddressesReducer} from './reducer_addresses';

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
        selected_author: SelectedAuthorReducer,
        selected_category: SelectedCategoryReducer,
        selected_publication: SelectedPublicationReducer,
        orders: OrdersReducer,
        shopping_cart: ShoppingCartReducer,
        addresses: AddressesReducer,
    }
)

export default RootReducer;