import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import RootReducer from './reducers/index'
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';

import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import axios from 'axios';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['user', 'filter']
};

const pReducer = persistReducer(persistConfig, RootReducer);


const store = applyMiddleware(ReduxPromise, ReduxThunk,)(createStore)(pReducer);
export const persistor = persistStore(store);

const routing = (

    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
)

ReactDOM.render(
    routing,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
