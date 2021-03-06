'use strict'


import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {
  Platform,
  View,
  StyleSheet,
  TextInput,
} from 'react-native'


class SearchBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={this.props.style}>
        <TextInput
          style={styles.searchBox}
          placeholder='Type here to lookup!'
          onChangeText={(text) => this.setState({text})}
        />
        <Icon
          size={20}
          style={[styles.icon, styles.historyIcon]}
          name={'history'}
        />
        <Icon
          size={20}
          style={[styles.icon, styles.searchIcon]}
          name={'search'}
        />
      </View>
    )
  }
}

let styles = StyleSheet.create({
  searchBox: {
    paddingLeft: 36,
    paddingRight: 36,
    margin: 5,
    borderRadius: 3,
    overflow: 'hidden',
    height: 30,
    ...Platform.select({
      ios: {
        height: 30,
      },
      android: {
        borderWidth: 0,
      },
    }),
  },
  icon: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 5,
    ...Platform.select({
      android: {
        top: 5,
      },
    }),
  },
  historyIcon: {
    left: 10,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  searchIcon: {
    right: 10,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
})

module.exports = SearchBar