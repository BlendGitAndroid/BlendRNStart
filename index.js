/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import {StackNavigator} from 'react-navigation'
import FlatListDemo from './demo/FlatListDemo';

const AppRoot = StackNavigator({
    App: {
        screen:App,
    },
    FlatListDemo: {
        screen: FlatListDemo,
        navigationOptions: {
            title: 'FlatListDemo'
        }
    }
});

AppRegistry.registerComponent(appName, () => AppRoot);
