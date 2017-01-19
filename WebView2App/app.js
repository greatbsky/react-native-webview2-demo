'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ToastAndroid,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';

import Web from 'react-native-webview2';
import Button from './components/Button';
import styles from './style/index.css';

export default class extends Component {

	constructor(props) {
        super(props);
        this.state = {
            js: ''
        };
        this.onLoad = this.onLoad.bind(this);
        this.onLoadStart = this.onLoadStart.bind(this);
        this.onLoadEnd = this.onLoadEnd.bind(this);
        this.onError = this.onError.bind(this);
        this.onContentSizeChange = this.onContentSizeChange.bind(this);
        this.renderError = this.renderError.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
        this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
        this.reload = this.reload.bind(this);
        this.evalReturn = this.evalReturn.bind(this);
    }

    onLoad(e) {
        // console.log('onLoad');
        // console.log(e.nativeEvent);
    }

    onLoadStart(e) {
        // console.log('onLoadStart');
        // console.log(e.nativeEvent);
    }

    onLoadEnd(e) {
        // console.log('onLoadEnd');
        // console.log(e.nativeEvent);
    }

    onError(e) {
        // this.setState({
        //     errmsg: 'Loading error...'
        // });
    }

    onContentSizeChange(e) {
        // console.log('onContentSizeChange');
        // console.log(e.nativeEvent);
    }

    renderError(errorDomain, errorCode, errorDesc) {
        ToastAndroid.show("Loading Failed...", ToastAndroid.SHORT);
        return (
            <TouchableWithoutFeedback onPress={this.reload} style={{padding:9}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height}}>
                    <Text>网络不给力！点击重新加载...sorry, reload please...</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    renderLoading() {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height, backgroundColor: 'white'}}>
                <ActivityIndicator size="small" color="gray" /><Text>加载中...Loading...</Text>
            </View>
        );
    }

    onNavigationStateChange(navState) {
        // console.log('onNavigationStateChange');
        // console.log(navState);
    }

    evalReturn(r) {
        eval(r);
    }

    go() {
        this.web.go('https://github.com/open-source');
    }

    reload() {
        this.web.reload();
    }

    goForward() {
        this.web.goForward();
    }

    goBack() {
        this.web.goBack();
    }

    test() {
        this.web.evalJs(`var t = document.title; returnEval('this.setText("' + t + '")')`);
    }

    setText(t) {
        this.setState({txt: t});
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <Button onPress={this.reload.bind(this)} label="reload" />
                    <Button onPress={this.goForward.bind(this)} label="goForward" />
                    <Button onPress={this.goBack.bind(this)} label="goBack" />
                    <Button onPress={this.go.bind(this)} label="go GitHub" />
                    <Button onPress={this.test.bind(this)} label="Get Title" />
                    <Text>Title:{this.state.txt}</Text>
                    <Web
                      ref={(c) => {this.web = c}}
                      evalReturn={this.evalReturn}
                    //  evalReturn={((r) => {eval(r)}).bind(this)}
                      source={{uri: 'http://www.163.com'}}
                      style={[styles.web, {minHeight: 300}]}
                      startInLoadingState={true}
                      onLoad={this.onLoad}
                      onLoadStart={this.onLoadStart}
                      onLoadEnd={this.onLoadEnd}
                      renderError={this.renderError}
                      renderLoading={this.renderLoading}
                      onNavigationStateChange={this.onNavigationStateChange}
                      onContentSizeChange={this.onContentSizeChange}
                      injectedJavaScript={this.state.js}
                      />
                    <Text style={styles.txt}>
                        This is the WebView or Web component in React Native both for Android and iOS, support auto height & call js between component and html document, very useful & easily!
                    </Text>
                    <Text>
{`
    This is a JavaScript-only implementation of WebView in React Native, named react-native-webview2 or WebView or Web.
    react-native-webview2 can change the height of WebView dynamically when you change the prop source={uri:xxx}(until now not yet support html) if you not set the prop style={height:xxx}, otherwise the height of WebView is fixed.
    react-native-webview2 also can make you call js in html document or reactnative, if you want to call js in html page from react-native, you just invoke this.web.evalJs("js code...here") from react-native, if you want to call react-native code, you just invoke returnEval("rn code...here") from html page, and set the prop evalReturn={(r) => {eval(r)} of this component WebView.
    react-native-webview2 support all of props like WebView in React Native.
    `}
                    </Text>
                </View>
            </ScrollView>
        );
    }

}
