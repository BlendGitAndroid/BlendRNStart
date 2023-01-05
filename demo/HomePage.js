import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default class HomePage extends React.Component {

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
    
            <Button
              title={"SectionListDemo"}
              onPress={() => {
                navigation.navigate("SectionListDemo")
              }}
            />
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
  });