import { combineReducers } from 'redux';
import { UserReducer } from './reducer_user';
import { CategoriesReducer } from './reducer_categories';
import { NotificationReducer } from './reducer_notification';

const RootReducer = combineReducers(
    {
        user: UserReducer,
        categories: CategoriesReducer,
        notification: NotificationReducer,
    }
)

export default RootReducer;