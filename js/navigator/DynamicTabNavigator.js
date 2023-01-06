import React, { Component } from "react";
import PopularPage from "../page/PopularPage";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrendingPage from "../page/TrendingPage";
import MyPage from "../page/MyPage";
import { createAppContainer } from "react-navigation";
import { BottomTabBar, createBottomTabNavigator } from "react-navigation-tabs";
import FavoritePage from "../page/FavoritePage";


//在这里配置页面的路由
const TABS = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: '最热',
            tabBarIcon: ({ tintColor, focused }) => (
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{ color: tintColor }}

                />
            ),
        }
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: '趋势',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={'md-trending-up'}
                    size={26}
                    style={{ color: tintColor }}

                />
            ),
        },
    },
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: '收藏',
            tabBarIcon: ({ tintColor, focused }) => (
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{ color: tintColor }}

                />
            ),
        },
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({ tintColor, focused }) => (
                <Entypo
                    name={'user'}
                    size={26}
                    style={{ color: tintColor }}

                />
            ),
        },
    },
}

export default class DynamicTabNavigator extends Component {

    constructor(props) {
        super(props);
        console.disableYellowBox = true;    //关闭黄色警告弹框
    }

    _tabNavigator() {
        const { PopularPage, TrendingPage, FavoritePage, MyPage } = TABS;
        const tabs = { PopularPage, TrendingPage, FavoritePage, MyPage };
        PopularPage.navigationOptions.tabBarLabel = "最热1";    //动态修改Tab属性
        return createAppContainer(createBottomTabNavigator(
            tabs,
            {
                tabBarComponent: TabBarComponent,
            }
        ))
    }

    render() {
        const Tab = this._tabNavigator();
        return <Tab></Tab>
    }

}

class TabBarComponent extends Component {

    constructor(props) {
        super(props);
        //设置原始的主题
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime(),
        }
    }

    render() {
        const { routes, index } = this.props.navigation.state;
        if (routes[index].params) {
            const { theme } = routes[index].params;
            //以最新的更新时间为主，防止被其他tab之前的修改覆盖掉
            if (theme && theme.updateTime > this.theme.updateTime) {
                this.theme = theme;
            }
        }
        return <BottomTabBar {...this.props} activeTintColor={this.theme.tintColor || this.props.activeTintColor}>
        </BottomTabBar>
    }

}