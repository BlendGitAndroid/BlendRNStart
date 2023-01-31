import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import BackPressComponent from '../common/BackPressComponent';
import FavoriteDao from '../expand/FavoriteDao';
import NavigationUtil from '../navigator/NavigationUtil';
import { WebView } from 'react-native-webview';
import NavigationBar, { NAVIGATION_BAR_HEIGHT } from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';

const TRENDING_URL = 'https://github.com/';

export default class DetailPage extends Component {

    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params;
        const { projectModel, flag } = this.params;
        this.favoriteDao = new FavoriteDao(flag);
        this.url = projectModel.item.html_url || TRENDING_URL + projectModel.item.fullName;
        const title = projectModel.item.full_name || projectModel.item.fullName;
        this.state = {
            title: title,
            url: this.url,
            canGoBack: false,
            isFavorite: projectModel.isFavorite
        };
        this.backPress = new BackPressComponent({ backPress: () => this.onBackPress() });
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    onBackPress() {
        this.onBack();
        return true;
    }

    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            NavigationUtil.goBack(this.props.navigation);
        }
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        })
    }

    render() {

        const { theme } = this.params;
        const titleLayoutStyle = this.state.title.length > 20 ? { paddingRight: 30 } : null;
        let navigationBar = <NavigationBar
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
            titleLayoutStyle={titleLayoutStyle}
            title={this.state.title}
            style={[styles.navBar, theme.styles.navBar]}
        />;

        return (
            <View style={styles.container}>
                <WebView
                    style={{ marginTop: NAVIGATION_BAR_HEIGHT }}
                    ref={webView => this.webView = webView}
                    startInLoadingState={true}
                    onNavigationStateChange={e => this.onNavigationStateChange(e)}
                    source={{ uri: this.state.url }}
                />
                {navigationBar}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navBar: {
        position: 'absolute',
        left: 0,
        right: 0
    },
});