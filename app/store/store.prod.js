/*
 * @Author: Kenneth Kwakye-Gyamfi 
 * @Date: 2017-11-08 22:14:50 
 * @Last Modified by: Kenneth Kwakye-Gyamfi
 * @Last Modified time: 2017-12-27 08:58:50
 * 
 * Redux store for production
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';
import initialStoreState from './initialStoreState';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

const configureStore = () => {
    const store = createStore(rootReducer, initialStoreState, enhancer);
    // eslint-disable-next-line
    store.subscribe(() => console.log('Store updated', store.getState()));

    return store;
};

export default { configureStore, history };
