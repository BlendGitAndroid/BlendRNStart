import React, { Component } from 'react';
import { Button } from "react-native";
import { View, StyleSheet, Text } from "react-native";


export default class TrendingPage extends Component {

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>TrendingPage</Text>
                <Button
                    title="修改主题"
                    onPress={() => navigation.setParams(
                        {
                            theme: {
                                tintColor: "blue",
                                updateTime: new Date().getTime(),
                            }
                        }
                    )}
                ></Button>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
})