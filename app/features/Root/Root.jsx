import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';
import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US';
import 'semantic-ui-css/semantic.min.css';

import './fonts/fonts.global.css';
import './antd.global.css';
import './root.css';
import Dashboard from '../Dashboard';

export default function Root(props) {
    return (
        <Provider store={props.store}>
            <Router history={props.history}>
                <LocaleProvider locale={enUS}>
                    <Dashboard history={props.history} />
                </LocaleProvider>
            </Router>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired
};
