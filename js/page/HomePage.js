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
    customThemeViewVisible: state.theme.customThemeViewVisible,
    theme: state.theme.theme,
});

const mapDispatchToProps = dispatch => ({
    onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);