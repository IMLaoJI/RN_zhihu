/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

//导入开机界面
import LaunchImage from './Component/Main/LaunchImage';


export default class App extends Component {
  render() {
    return (
        <Navigator
            initialRoute={{ name: '开机动画', component: LaunchImage }}
            configureScene={() => {
              return Navigator.SceneConfigs.PushFromRight;
            }}
            renderScene={(route, navigator) => {
              let Component = route.component;
              return <Component {...route.params} navigator={navigator} />
            }}
        />
    );
  }
}

const styles = StyleSheet.create({
 
});

AppRegistry.registerComponent('App', () => App);
