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

        // 为了让所有页面都能拿到navigation，这里将navigation传递给NavigationUtil
        // js中，变量在NavigationUtil中没有定义，但是也可以直接赋值
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
            {/* 在 JSX 中，如果你想要调用 JavaScript 函数并将其返回值插入到 JSX 中，你需要使用 {}。所以，
            如果你直接写 this.renderCustomThemeView() 而不使用 {}，那么它将被视为纯文本，而不是一个函数调用。 */}
            {this.renderCustomThemeView()}
        </SafeAreaViewPlus>;
    }
}

// 从全局的state中拿到的数据，放到props中
// 这里是简写，省略了return，省略了{}
const mapStateToProps = state => ({
    //这个括号括起来的,也是一个对象,记住都是对象
    //所有的数据都是放在state中
    customThemeViewVisible: state.theme.customThemeViewVisible,
    theme: state.theme.theme,
});

// 使用dispatch方法，将action的方法绑定到props上
const mapDispatchToProps = dispatch => ({
    //这里是一个函数对象,对象的属性名是onShowCustomThemeView,属性值是(show) => dispatch(actions.onShowCustomThemeView(show))的匿名函数
    onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView1(show)),

    //下面的是上面的全部写法
    // onShowCustomThemeView(show) {
    //     dispatch(actions.onShowCustomThemeView(show))
    // }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);