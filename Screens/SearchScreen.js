import React, { Component } from 'react';
import {StyleSheet,View} from 'react-native';
import { Searchbar,Card} from 'react-native-paper';

export default class SearchScreen extends Component {
  state = {
    firstQuery: '',
  };

  render() {
    const { firstQuery } = this.state;
    return (
      <Searchbar
        placeholder="Search"
        onChangeText={query => { this.setState({ firstQuery: query }); }}
        value={firstQuery}
      />
    );
  }
}