import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppsList from './src/components/AppsList';
import AppsListHelper from './src/components/AppsListHelper';
import Dock from './src/components/Dock';
import Header from './src/components/Header';
import colors from './src/constants/colors';

const App = () => {
  return (
    <AppsListHelper>
      <View style={styles.container}>
        <Header />
        <AppsList />
        <Dock />
      </View>
    </AppsListHelper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 30,
  },
});

export default App;
