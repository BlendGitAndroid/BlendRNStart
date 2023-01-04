/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import {StackNavigator} from 'react-navigation'
import FlatListDemo from './demo/FlatListDemo';
import SectionListDemo from './demo/SectionListDemo';

const AppRoot = StackNavigator({
    App: {
        screen:App,
        navigationOptions: {
            title: '首页'
        }
    },
    FlatListDemo: {
        screen: FlatListDemo,
        navigationOptions: {
            title: 'FlatListDemo'
        }
    },
    SectionListDemo : {
        screen: SectionListDemo,
        navigationOptions: {
            title: 'SectionListDemo'
        }
    }
});

AppRegistry.registerComponent(appName, () => AppRoot);
