'use strict';

import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableHighlight
} from 'react-native';

import styles from './style/index.css';

/**
<Button onPress={} style={} label={}>xxxx</Button>
*/
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, props, {});
    }

    render() {
        var child = null;
        if (this.props.children && typeof(this.props.children) != 'string') {
            child = this.props.children;
        } else {
            child = <Text style={styles.text}>
                {this.props.children ? this.props.children : this.props.label}
            </Text>;
        }
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={[styles.button, this.props.style]}>
                    {child}
                </View>
            </TouchableHighlight>
        );
    }
}
