/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { AppStackNavigator } from './demo/navigators/AppNavigators'
import { createAppContainer } from 'react-navigation';

export default createAppContainer(AppStackNavigator);