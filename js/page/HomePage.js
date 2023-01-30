import React, { Component } from 'react';
import DynamicTabNavigator from "../navigator/DynamicTabNavigator";
import NavigationUtil from "../navigator/NavigationUtil";
import { connect } from 'react-redux';

class HomePage extends Component {

    constructor(props){
        super(props);
    }

    render() {
        //FIX DynamicTabNavigator中的页面无法跳转到外层导航器页面的问题
        NavigationUtil.navigation = this.props.navigation;
        return <DynamicTabNavigator />;
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