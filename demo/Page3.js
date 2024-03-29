import React from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';

export default class Page3 extends React.Component {

    render() {
        console.log("Page3.props");
        const { navigation } = this.props;
        const { state, setParams } = navigation;
        const { params } = state;
        const showText = params && params.mode === 'edit' ? '正在编辑' : '编辑完成';

        return <View style={{ flex: 1, backgroundColor: "gray", paddingTop: 30 }}>
            <Text style={styles.text}>欢迎来到Page3</Text>
            <Text style={styles.showText}>{showText}</Text>
            <Button title={'Go Back'} onPress={() => {
                navigation.goBack();
            }} />
            <TextInput
                style={styles.input}
                onChangeText={text => {
                    //设置标题
                    setParams({ name: text });
                }
                }
            />
        </View>
    }

}
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: 'white'
    },
    showText: {
        marginTop: 20,
        fontSize: 20,
        color: 'red'
    },
    input: {
        height: 50,
        borderWidth: 1,
        marginTop: 10,
        borderColor: 'black'
    }
});