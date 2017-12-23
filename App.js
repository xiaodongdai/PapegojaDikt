/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict'

import React, { Component } from 'react'  
import TabNavigator from 'react-native-tab-navigator'
import SearchBar from './components/SearchBar'
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'

import { getStatusBarHeight } from 'react-native-status-bar-height'


let ICON_SIZE = 24
let STATUS_BAR_HEIGHT = getStatusBarHeight()

export default class App extends Component{
  constructor(props, context) {
    super(props, context)
    this.state = {
      selectedTab: 'dict',
      text: 'text'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar style={styles.searchBar}>
        </SearchBar>
        <TabNavigator>
          <TabNavigator.Item
            title='Dictionary'
            renderIcon={() => <Image source={require('./images/dictionary.png')} style={styles.bottomIcon} />}
            selected={this.state.selectedTab === 'dict'}
            onPress={() => { this.setState({selectedTab: 'dict'}) }}>
            <Text style={styles.welcome}>
              Welcome to Dict!
            </Text>
          </TabNavigator.Item>
          <TabNavigator.Item
            title='Words'
            renderIcon={() => <Image source={require('./images/words.png')} style={styles.bottomIcon} />}
            selected={this.state.selectedTab === 'words'}
            onPress={() => { this.setState({selectedTab: 'words'}) }}>
            <Text style={styles.welcome}>
              Welcome to Words!
            </Text>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',

  },
  searchBar: {
    backgroundColor: '#f8f8f8',
    top: STATUS_BAR_HEIGHT ,
    left: 0,
    right: 0,
    height: 49,
  },
  /*
  searchBox: {
    backgroundColor: '#ffffff',
    paddingLeft: 26,
    borderRadius: 3,
    top: 5,
    left: 5,
    right: 5,
    height: 40,
  },
  */

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  bottomIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    resizeMode: 'contain'
  }
})
