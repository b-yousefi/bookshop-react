import { combineReducers } from 'redux';
import { UserReducer } from './reducer_user';
import { CategoriesReducer } from './reducer_categories';

const RootReducer = combineReducers(
    {
        user: UserReducer,
        categories: CategoriesReducer
    }
)

export default RootReducer;