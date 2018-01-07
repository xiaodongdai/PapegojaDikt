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
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native'
var RNFS = require('react-native-fs');
import { getStatusBarHeight } from 'react-native-status-bar-height'

//TODO: to use react-native-fs
var mdict = require('mdict');

let ICON_SIZE = 24
let STATUS_BAR_HEIGHT = getStatusBarHeight()

export default class App extends Component{
  constructor(props, context) {
    super(props, context)
    this.state = {
      selectedBottomTab: 'dict',
      text: 'text',
      selectTab1: 'button1'
    }
  }

  buttonStyle(active) {
    console.log('buttonStyle')
    return active ? {borderBottomWidth: 0} : {top: 1, height: 39, borderBottomWidth: 1}
  }
  
  _onPressLearnMore() {
    console.log('_onPressed!')

    const URL = 'http://192.168.1.49:3000/dictionary.mdx'
    const DEST = RNFS.DocumentDirectoryPath + '/dictionary.mdx'
    const fileName = 'dictionary.mdx'

    RNFS.downloadFile({fromUrl: URL, toFile: DEST}).promise.then((dwResult) => {
      console.log(dwResult.jobId + 'jobid');
      return true
    }).then(() => mdict.dictionary(DEST)).then(dictionary => {
      console.log("Success!", dictionary)
      dictionary.search({
        phrase: 'test', /// '*' and '?' supported
        max: 10           /// maximum results
      }).then(foundWords => {
        console.log('Found words:');
        console.log(foundWords);      /// foundWords is array
        var word = '' + foundWords[0];
        console.log('Loading definitions for: '+word);
        return dictionary.lookup(word);
      }).then(definitions => {
        console.log('definitions:');     /// definition is array
        console.log(definitions);
      }).catch((err) => {
        alert(err);
        return false
      })
    })
  }

    /*
    RNFS.readDir(RNFS.MainBundlePath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    .then((result) => {
      console.log('GOT RESULT', result);

      // stat the first file
      return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    })
    .then((statResult) => {
      if (statResult[0].isFile()) {
        // if we have a file, read it
        return RNFS.readFile(statResult[1], 'utf8');
      }

      return 'no file';
    })
    .then((contents) => {
      // log the file contents
      console.log(contents);
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
    */
  render() {
    console.log('mytest')
    return (
      <View style={styles.container}>
        <SearchBar style={styles.searchBar}>
        </SearchBar>

        <TabNavigator>
          <TabNavigator.Item
            title='Dictionary'
            renderIcon={() => <Image source={require('./images/dictionary.png')} style={styles.bottomIcon} />}
            selected={this.state.selectedBottomTab === 'dict'}
            onPress={() => { this.setState({selectedBottomTab: 'dict'}) }}>
            <View style={{top: STATUS_BAR_HEIGHT, left: 10, right: 10, flex: 0, position: 'absolute'}}>
              <View style={{top: 39, borderWidth: 1, height: 200,     borderColor: '#00BFFF'}}>
              </View>
              <View style={{top: 0, height: 100, flex: 1, flexDirection: 'row', position: 'absolute'}}>
                <TouchableOpacity activeOpacity={1} 
                  onPress={() => { console.log('clicked');this.setState({selectTab1: 'button1'}) }}
                  style={[styles.button, this.buttonStyle(this.state.selectTab1 === 'button1')]}>
                    <Text style={styles.buttonText}> Touch 1 </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1}
                  onPress={() => { console.log('clicked');this.setState({selectTab1: 'button2'}) }}
                  style={[styles.button, this.buttonStyle(this.state.selectTab1 === 'button2')]}>
                    <Text style={styles.buttonText}> Touch 2 </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TabNavigator.Item>
          <TabNavigator.Item
            title='Words'
            renderIcon={() => <Image source={require('./images/words.png')} style={styles.bottomIcon} />}
            selected={this.state.selectedBottomTab === 'words'}
            onPress={() => { this.setState({selectedBottomTab: 'words'}) }}>
            <Button
              onPress={this._onPressLearnMore}
              title='Learn More'
              color='#841584'
              accessibilityLabel='Learn more about this purple button'
            />
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
    height: 30,
  },

  button: {
    height: 40,
    marginRight: 2,
    borderColor: '#00BFFF',
    backgroundColor: '#F5FCFF',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  bottonText: {
    color: '#00BFFF',
  },
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
