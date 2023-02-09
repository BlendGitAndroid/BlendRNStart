import React, { Component } from 'react';
import { Text, View, StyleSheet } from "react-native";
import NavigationUtil from "../navigator/NavigationUtil";
import SplashScreen from 'react-native-splash-screen'

export default class WelcomePage extends Component {

    componentDidMount() {
        SplashScreen.hide();
        this.timer = setTimeout(() => {
            //跳转到首页
            NavigationUtil.resetToHomePage(this.props);
        }, 500)
    }

    componentWillMount() {
        //页面销毁时，清空计时器
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    这里是广告页面
                </Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})