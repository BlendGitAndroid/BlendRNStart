import React from "react"
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import FlatListDemo from '../FlatListDemo';
import SectionListDemo from '../SectionListDemo';
import HomePage from '../HomePage';
import Page1 from "../Page1";
import Page2 from "../Page2";
import Page3 from "../Page3";
import { Button, Text, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

const TopTabNavigator = createMaterialTopTabNavigator(
    {
        Page1: {
            screen: Page1,
            navigationOptions: {
                tabBarLabel: 'Page1',
            }
        },
        Page2: {
            screen: Page2,
            navigationOptions: {
                tabBarLabel: ({ tintColor, focused }) => (//自定义Tab文字
                    <Text style={{ color: focused ? 'orange' : 'grey' }}>Page2</Text>
                ),
            }
        },
        Page3: {
            screen: Page3,
            navigationOptions: {
                tabBarLabel: 'Page3',
            }
        },
    },
    {
        tabBarOptions: {
            // activeTintColor: 'red'
            tabStyle: { //tab样式
                minWidth: 50
            },
            upperCaseLabel: false,//是否使标签大写，默认为true,
            style: {
                backgroundColor: '#879'
            },
            indicatorStyle: {//指示器样式
                height: 2,
                backgroundColor: 'white'
            },
            labelStyle: {//文字的样式
                fontSize: 13,
                marginTop: 6,
                marginBottom: 6
            }
        }
    }
)

const BottomTabNavigator = createBottomTabNavigator(
    {
        //配置页面路由
        Page1: {
            screen: Page1,
            navigationOptions: {
                tabBarLabel: 'Page1',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={'ios-home'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                )
            }
        },
        Page2: {
            screen: Page2,
            navigationOptions: {
                tabBarLabel: ({ tintColor, focused }) => (//自定义Tab文字
                    <Text style={{ color: focused ? 'orange' : 'grey', textAlign: 'center' }}>Page2</Text>
                ),
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={'ios-people'}
                        size={26}
                        style={{ color: focused ? 'orange' : 'grey' }}
                    />
                )
            }
        }

    },
    {
        tabBarOptions: {
            activeTintColor: 'red'  //默认配置
        }
    }
)

export const AppStackNavigator = createStackNavigator(
    {
        HomePage: {
            screen: HomePage,
            navigationOptions: {
                title: '首页'
            }
        },
        BottomTabNavigator: {
            screen: BottomTabNavigator,
            navigationOptions: {
                title: '底部导航器',
                headerShown: false
            }
        },
        TopTabNavigator: {
            screen: TopTabNavigator,
            navigationOptions: {
                title: '顶部导航器'
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
                            //mode是params可以设置的一个参数
                            title={params.mode === 'edit' ? '保存' : "编辑"}
                            onPress={() => {
                                //设置mode参数
                                setParams({ mode: params.mode === 'edit' ? "" : 'edit' })
                            }}
                        />
                    )
                }
            }
        },
    }
);