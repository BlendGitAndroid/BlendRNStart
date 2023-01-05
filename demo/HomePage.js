import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

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

                <Button
                    title={"Page1"}
                    onPress={() => {
                        navigation.navigate("Page1", { name: "动态的" })
                    }}
                />

                <Button
                    title={"Page2"}
                    onPress={() => {
                        navigation.navigate("Page2")
                    }}
                />

                <Button
                    title={"Page3"}
                    onPress={() => {
                        navigation.navigate("Page3", { name: "Page3的界面" })
                    }}
                />

                <Button title={'底部导航'} onPress={() => {
                    navigation.navigate('BottomTabNavigator');
                }} />
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