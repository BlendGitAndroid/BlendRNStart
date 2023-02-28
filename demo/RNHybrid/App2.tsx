import React, { Component } from 'react';
import CommonPage from './CommonPage';

export default class App2 extends Component {
    render() {
        return <CommonPage name="App2" {...this.props} />;
    }
}