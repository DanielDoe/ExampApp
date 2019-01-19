/*
 * @Author: Kenneth Kwakye-Gyamfi 
 * @Date: 2017-12-27 08:44:35 
 * @Last Modified by: Kenneth Kwakye-Gyamfi
 * @Last Modified time: 2017-12-27 08:56:23
 * 
 * Redux store in development mode
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'react-router-redux';
import { createLogger } from 'redux-logger';

import initialStoreState from './initialStoreState';
import rootReducer from '../reducers';

const history = createHashHistory();

const configureStore = () => {
    // Redux configuration
    const middleware = [];
    const enhancers = [];

    middleware.push(thunk);

    const logger = createLogger({
        level: 'info',
        collapsed: true
    });
    middleware.push(logger);

    // Router middleware
    const router = routerMiddleware(history);
    middleware.push(router);

    // All action creators created here
    const actionCreators = { ...routerActions };

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
            actionCreators,

        }) : compose;

    // Apply middleware and compose enhancers
    enhancers.push(applyMiddleware(...middleware));
    const enhancer = composeEnhancers(...enhancers);

    const store = createStore(rootReducer, initialStoreState, enhancer);
    // eslint-disable-next-line
    store.subscribe(() => console.log('Store updated', store.getState()));

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            // eslint-disable-next-line
            store.replaceReducer(require('../reducers'));
        });
    }

    return store;
};

export default { configureStore, history };
