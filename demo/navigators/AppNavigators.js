import React from "react"
import { createStackNavigator } from 'react-navigation-stack'
import FlatListDemo from '../FlatListDemo';
import SectionListDemo from '../SectionListDemo';
import HomePage from '../HomePage';
import Page1 from "../Page1";
import Page2 from "../Page2";
import Page3 from "../Page3";
import {Button, Text, ScrollView} from 'react-native';


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
        },
        Page1: {
            screen: Page1,
            //从props中取出navigation，所以这里要用{}解构出来
            navigationOptions: ({ navigation }) => (
                {
                    title: `${navigation.state.params && navigation.state.params.name}页面名`//动态设置navigationOptions
                }
            )
        },
        Page2: {
            screen: Page2,
            navigationOptions: {
                title: "Page2",
            }
        },
        Page3: {
            screen: Page3,
            navigationOptions: (props) => {
                const { navigation } = props;
                const { state, setParams } = navigation;
                const { params = {} } = state;
                return {
                    title: params.name ? params.name : "This is Page3",
                    headerRight: (
                        <Button
                            title={params.mode === 'edit' ? '保存' : "编辑"}
                            onPress={() => {
                                setParams({ mode: params.mode === 'edit' ? "" : 'edit' })
                            }}
                        />
                    )
                }
            }
        },
    }
);