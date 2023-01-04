/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';

import {
  Button,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';

export default class App extends Component {

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Button
          title={"FlatListDemo"}
          onPress={() => {
            navigation.navigate("FlatListDemo")
          }}
        ></Button>
      </View>
    )
  }
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});