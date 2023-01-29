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

/**
 * Redux三大原则
 * 1.单一数据源
 * 2.state是只读的，修改state的唯一方式是触发action
 * 3.使用纯函数reducer来修改state，返回一个新的state给store
 */
export default class App extends Component {

    render() {
        /**
         * 3. 将store传递给APP框架
         * 
         * Provider 这个组件需要包裹在整个组件树的最外层。这个组件让根组件的所有子孙组件能够轻松的使用 connect() 方法绑定 store
         */
        return <Provider store={store}>
            <AppNavigators>
            </AppNavigators>
        </Provider>
    }

}