/*
 * @Author: Kenneth Kwakye-Gyamfi 
 * @Date: 2017-12-27 08:40:05 
 * @Last Modified by: Kenneth Kwakye-Gyamfi
 * @Last Modified time: 2017-12-27 15:06:50
 * 
 * React Start point
 */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { configureStore, history } from './store';
import Root from './features/Root';

const store = configureStore();

render((
    <AppContainer>
        <Root store={store} history={history} />
    </AppContainer>
), document.getElementById('root'));

if (module.hot) {
    module.hot.accept('./features/Root/Root', () => {
        // eslint-disable-next-line
        const NextRoot = require('./features/Root/Root');

        render(
            <AppContainer>
                <NextRoot store={store} history={history} />
            </AppContainer>
        );
    });
}
