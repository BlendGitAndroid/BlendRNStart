/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppNavigators from './js/navigator/AppNavigators';
import store from './js/store';

export default class App extends Component {

    render() {
        /**
         * 3. 将store传递给APP框架
         */
        return <Provider store={store}>
            <AppNavigators>
            </AppNavigators>
        </Provider>
    }

}