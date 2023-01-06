import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import NavigationUtil from "../navigator/NavigationUtil";

export default class PopularPage extends Component {

    constructor(props) {
        super(props);
        this.tabNames = ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP'];
    }

    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                //设置界面，并传递参数
                screen: props => <PopularTab {...props} tabLabel={item}></PopularTab>,
                navigationOptions: {
                    title: item,
                },
            }
        })
        return tabs;
    }

    render() {
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
            this._genTabs(),
            {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,  //最小宽度
                    upperCaseLabel: false,  //取消全部大写
                    scrollEnabled: true,    //可以滑动
                    style: {
                        backgroundColor: '#a67',
                    },
                    indicatorStyle: styles.indicatorStyle,  //指示器的样式
                    labelStyle: styles.labelStyle,  //label的样式
                },
            }
        ));
        return (
            <View style={styles.container}>
                <TabNavigator />
            </View>
        )
    }

}

class PopularTab extends Component {

    render() {
        return (
            <View>
                <Text>
                    PopularTab
                </Text>
                <Text onPress={
                    () => {
                        NavigationUtil.goPage({}, 'DetailPage');
                    }
                }>跳转到详情页</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        // marginTop: 30,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    tabStyle: {
        minWidth: 50,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white',
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6,
    },

})