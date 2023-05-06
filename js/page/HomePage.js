import React, { Component } from 'react';
import DynamicTabNavigator from "../navigator/DynamicTabNavigator";
import NavigationUtil from "../navigator/NavigationUtil";
import { connect } from 'react-redux';
import actions from '../action';
import { View } from 'react-native';
import CustomTheme from './CustomTheme';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';

class HomePage extends Component {

    constructor(props) {
        super(props);
    }

    renderCustomThemeView() {
        const { customThemeViewVisible, onShowCustomThemeView } = this.props;
        return (<CustomTheme
            visible={customThemeViewVisible}
            {...this.props}
            onClose={() => onShowCustomThemeView(false)}
        />);
    }

    render() {
        const { theme } = this.props;
        NavigationUtil.navigation = this.props.navigation;
        //注意：这里要有{ flex: 1 }，才能显示出来
        // return <View style={{ flex: 1 }}>
        //     <DynamicTabNavigator />
        //     {this.renderCustomThemeView()}
        // </View>;
        //适配全面屏
        return <SafeAreaViewPlus
            topColor={theme.themeColor}>
            <DynamicTabNavigator />
            {this.renderCustomThemeView()}
        </SafeAreaViewPlus>;
    }
}

const mapStateToProps = state => ({
    //这个括号括起来的,也是一个对象,记住都是对象
    //所有的数据都是放在state中
    customThemeViewVisible: state.theme.customThemeViewVisible,
    theme: state.theme.theme,
});

const mapDispatchToProps = dispatch => ({
    //这里是一个对象,对象的属性名是onShowCustomThemeView,属性值是(show) => dispatch(actions.onShowCustomThemeView(show))的匿名函数
    onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView1(show)),

    //下面的是上面的全部写法
    // onShowCustomThemeView(show) {
    //     dispatch(actions.onShowCustomThemeView(show))
    // }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);