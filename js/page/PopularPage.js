import React, { Component } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, RefreshControl, FlatList } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { connect } from 'react-redux';
import NavigationBar from '../common/NavigationBar';
import NavigationUtil from "../navigator/NavigationUtil";
import { FLAG_LANGUAGE } from "../expand/LanguageDao";
import actions from '../action/index'
import PopularItem from '../common/PopularItem';
import Toast from 'react-native-easy-toast';
import FavoriteDao from "../expand/FavoriteDao";
import { FLAG_STORAGE } from "../expand/DataStore";
import FavoriteUtil from '../util/FavoriteUtil';
import EventBus from 'react-native-event-bus';
import EventTypes from '../util/EventTypes';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);

class PopularPage extends Component {

    constructor(props) {
        super(props);
        const { onLoadLanguage } = this.props;
        onLoadLanguage(FLAG_LANGUAGE.flag_key);
    }

    _genTabs() {
        const tabs = {};
        //这其实是一个回调，后面的(item,index) => {} ,就是一个函数，要理解这个
        const { keys, theme } = this.props;
        keys.forEach((item, index) => {
            if (item.checked) {
                tabs[`tab${index}`] = {
                    //设置界面，并传递参数，这么遍历创建PopularTab页面
                    screen: props => <PopularTabPage {...props} tabLabel={item.name} theme={theme}></PopularTabPage>,
                    navigationOptions: {
                        title: item.name,
                    },
                }
            }
        })
        return tabs;
    }

    render() {
        const { keys, theme } = this.props;

        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: 'light-content',
        };

        let navigationBar = <NavigationBar
            title={'最热'}
            statusBar={statusBar}
            style={theme.styles.navBar}
        />;

        const TabNavigator = keys.length ? createAppContainer(createMaterialTopTabNavigator(
            this._genTabs(),
            {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,  //最小宽度
                    upperCaseLabel: false,  //取消全部大写
                    scrollEnabled: true,    //可以滑动
                    style: {
                        backgroundColor: theme.themeColor,//TabBar 的背景颜色
                    },
                    indicatorStyle: styles.indicatorStyle,  //指示器的样式
                    labelStyle: styles.labelStyle,  //label的样式
                },
                lazy: true  //懒加载
            }
        )) : null;
        return (
            <View style={styles.container}>
                {navigationBar}
                {TabNavigator && <TabNavigator />}
            </View>
        )
    }

}

const pageSize = 10;//设为常量，防止修改
class PopularTab extends Component {

    constructor(props) {
        super(props);
        const { tabLabel } = this.props;
        this.storeName = tabLabel;
        this.isFavoriteChanged = false;
    }

    componentDidMount() {
        this.loadData();
        EventBus.getInstance().addListener(EventTypes.favorite_changed_popular, this.favoriteChangeListener = () => {
            this.isFavoriteChanged = true;
        });
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.bottomTabSelectListener = (data) => {
            if (data.to === 0 && this.isFavoriteChanged) {
                this.loadData(null, true);
                this.isFavoriteChanged = false;
            }
        })
    }

    componentWillUnmount() {
        EventBus.getInstance().removeListener(this.favoriteChangeListener);
        EventBus.getInstance().removeListener(this.bottomTabSelectListener);
    }

    loadData(loadMore, refreshFavorite) {
        const { onRefreshPopular, onLoadMorePopular, onFlushPopularFavorite } = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        if (loadMore) {
            onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, favoriteDao, callback => {
                this.refs.toast.show('没有更多了');
            })
        } else if (refreshFavorite) {
            onFlushPopularFavorite(this.storeName, store.pageIndex, pageSize, store.items, favoriteDao);
        } else {
            onRefreshPopular(this.storeName, url, pageSize, favoriteDao)
        }
    }

    /**
    * 获取与当前页面有关的数据
    * @returns {*}
    * @private
    */
    _store() {
        const { popular } = this.props;
        let store = popular[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: [],//要显示的数据
                hideLoadingMore: true,//默认隐藏加载更多
            }
        }
        return store;
    }

    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }

    renderItem(data) {
        const item = data.item;
        const { theme } = this.props;
        return <PopularItem
            projectModel={item}
            theme={theme}
            onSelect={(callback) => {
                NavigationUtil.goPage({
                    theme,
                    projectModel: item,
                    flag: FLAG_STORAGE.flag_popular,
                    callback,
                }, 'DetailPage')
                //  this.props.navigation.navigate('tab1');//跳转到createMaterialTopTabNavigator中的指定tab，主要这个navigation一定要是在跳转到createMaterialTopTabNavigator中的指页面获取的
            }}
            onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_popular)}
        />
    }

    genIndicator(theme) {
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator color={theme.themeColor} size="large"
                    style={{ margin: 10 }}
                />
                <Text>正在加载更多</Text>
            </View>
    }

    render() {
        let store = this._store();
        const { theme } = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.projectModels}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + item.item.id}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={theme.themeColor}
                            colors={[theme.themeColor]}
                            refreshing={store.isLoading}
                            onRefresh={() => this.loadData()}
                            tintColor={theme.themeColor}
                        />
                    }
                    ListFooterComponent={() => this.genIndicator(theme)}
                    onEndReached={() => {
                        console.log('---onEndReached----');
                        setTimeout(() => {
                            if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                                this.loadData(true);
                                this.canLoadMore = false;
                            }
                        }, 100);
                    }}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin={() => {
                        this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
                        console.log('---onMomentumScrollBegin-----')
                    }}
                />
                <Toast ref={'toast'}
                    position={'center'}
                />
            </View>
        );
    }

}

const mapStateToProps = state => ({
    popular: state.popular
});
const mapDispatchToProps = dispatch => ({
    //将 dispatch(onRefreshPopular(storeName, url))绑定到props
    onRefreshPopular: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onRefreshPopular(storeName, url, pageSize, favoriteDao)),
    onLoadMorePopular: (storeName, pageIndex, pageSize, items, favoriteDao, callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, favoriteDao, callBack)),
    onFlushPopularFavorite: (storeName, pageIndex, pageSize, items, favoriteDao) => dispatch(actions.onFlushPopularFavorite(storeName, pageIndex, pageSize, items, favoriteDao)),
});
//注意：connect只是个function，并不应定非要放在export后面
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)

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
        margin: 0,
    },
    indicatorContainer: {
        alignItems: "center"
    }

})

/**
 * 将dispatch加入到Props中
 * mapDispatchToProps其实是一个函数（方法），dispatch是一个入参，
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

// 这段代码是在使用 Redux 库的一个常见模式。mapPopularStateToProps 是一个函数，它的作用是将 Redux store 中的状态映射到 React 组件的 props 上。
// 在这个函数中，我们接收一个参数 state，这个 state 就是 Redux store 中的状态。然后我们返回一个对象，这个对象定义了我们想要映射到 props 的状态。
// 在这个例子中，我们映射了 state.language.keys 到 keys，并映射 state.theme.theme 到 theme。这意味着在我们的组件中，我们可以通过 this.props.keys 
// 和 this.props.theme 来访问这些状态。
const mapPopularStateToProps = state => ({
    keys: state.language.keys,
    theme: state.theme.theme,
});

// 这段代码是在使用 Redux 库的一个常见模式。mapDispatchToProps 是一个函数，它的作用是将 Redux store 中的 dispatch 方法映射到 React 组件的 props 上。
// 在这个函数中，我们接收一个参数 dispatch，这个 dispatch 就是 Redux store 的 dispatch 方法。然后我们返回一个对象，这个对象定义了我们想要映射到 props 的方法。
// 在这个例子中，我们映射了 actions.onLoadLanguage 到 onLoadLanguage。这意味着在我们的组件中，我们可以通过 this.props.onLoadLanguage 来访问这个方法。
// 这个方法接收一个参数 flag，然后调用 dispatch(actions.onLoadLanguage(flag)) 来改变 Redux store 中的状态。
const mapPopularDispatchToProps = dispatch => ({
    onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag))
});


//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapPopularStateToProps, mapPopularDispatchToProps)(PopularPage);