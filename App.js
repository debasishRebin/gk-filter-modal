import React from 'react';
import {View, Button, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Example from './Example';
import FilterDataProvider from './FilterDataProvider';

const App = () => {
  return (
    <FilterDataProvider>
      <Example />
    </FilterDataProvider>
  );
};

export default App;
