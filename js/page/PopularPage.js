import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { connect } from 'react-redux';
import NavigationUtil from "../navigator/NavigationUtil";

class PopularPage extends Component {

    constructor(props) {
        super(props);
        this.tabNames = ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP'];
    }

    _genTabs() {
        const tabs = {};
        //这其实是一个回调，后面的(item,index) => {} ,就是一个函数，要理解这个
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                //设置界面，并传递参数，这么遍历创建PopularTab页面
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
                <Text onPress={
                    () => {
                        NavigationUtil.goPage({}, 'FetchDemoPage');
                    }
                }>跳转FetchDemo</Text>
                                <Text onPress={
                    () => {
                        NavigationUtil.goPage({}, 'AsyncStorageDemoPage');
                    }
                }>跳转AsyncStorageDemo</Text>
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

/**
 * 将dispatch加入到Props中
 * mapDispatchToProps其实是一个方法，dispatch是一个入参，
 * 里面是一个key:value的形式，只不过这个value是一个方法的返回值
 *  
 */
// const mapDispatchToProps = dispatch => ({
//     onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
// });
// export default connect(null, mapDispatchToProps)(PopularPage);

/**
 * connect：这是 react-redux 提供的一个方法。如果一个组件想要响应状态的变化，就把自己作为参数传给 connect() 的结果，
 * connect() 方法会处理与 store 绑定的细节，并通过 selector 确定该绑定 store 中哪一部分的数据。
 * react-redux提供了connect函数，connect是一个高阶函数，首先传入mapStateToProps、mapDispatchToProps，然后返回一个生产
 *  Component 的函数(wrapWithConnect)，然后再将真正的Component作为参数传入wrapWithConnect(MyComponent)，这样就生产出
 * 一个经过包裹的Connect组件，如:export default connect(mapStateToProps)(HomePage);
 * 
 * dispatch：每当你想要改变应用中的状态时，你就要 dispatch 一个 action，这也是唯一改变状态的方法。
 * 
 * 
 */
export default connect(null, (dispatch) => ({
    onThemeChange: (theme => dispatch(actions.onThemeChange(theme))),
}))(PopularPage);