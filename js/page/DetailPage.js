import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Button } from 'react-native';
import BackPressComponent from '../common/BackPressComponent';
import FavoriteDao from '../expand/FavoriteDao';
import NavigationUtil from '../navigator/NavigationUtil';
import { WebView } from 'react-native-webview';
import NavigationBar, { NAVIGATION_BAR_HEIGHT } from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

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

    onFavoriteButtonClick() {
        const { projectModel, callback } = this.params;
        const isFavorite = projectModel.isFavorite = !projectModel.isFavorite;
        callback(isFavorite);//更新Item的收藏状态
        this.setState({
            isFavorite: isFavorite,
        });
        let key = projectModel.item.fullName ? projectModel.item.fullName : projectModel.item.id.toString();
        if (projectModel.isFavorite) {
            this.favoriteDao.saveFavoriteItem(key, JSON.stringify(projectModel.item));
        } else {
            this.favoriteDao.removeFavoriteItem(key);
        }
    }

    renderRightButton() {
        return (<View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
                onPress={() => this.onFavoriteButtonClick()}>
                <FontAwesome
                    name={this.state.isFavorite ? 'star' : 'star-o'}
                    size={20}
                    style={{ color: 'white', marginRight: 10 }}
                />
            </TouchableOpacity>
        </View>
        )
    }

    render() {

        const { theme } = this.params;
        const titleLayoutStyle = this.state.title.length > 20 ? { paddingRight: 30 } : null;
        let navigationBar = <NavigationBar
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
            titleLayoutStyle={titleLayoutStyle}
            title={this.state.title}
            style={[styles.navBar, theme.styles.navBar]}
            rightButton={this.renderRightButton()}
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