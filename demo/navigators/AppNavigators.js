import React from "react"
import { createStackNavigator } from 'react-navigation-stack'
import FlatListDemo from '../FlatListDemo';
import SectionListDemo from '../SectionListDemo';
import HomePage from '../HomePage'

export const AppStackNavigator = createStackNavigator(
    {
        HomePage: {
            screen: HomePage,
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
        SectionListDemo: {
            screen: SectionListDemo,
            navigationOptions: {
                title: 'SectionListDemo'
            }
        }
    }
);