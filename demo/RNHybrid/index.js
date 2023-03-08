/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import App2 from './App2';
import {name as appName} from './app.json';

//注册两个组件，在不同的位置展示
AppRegistry.registerComponent("App1", () => App);
AppRegistry.registerComponent("App2", () => App2);