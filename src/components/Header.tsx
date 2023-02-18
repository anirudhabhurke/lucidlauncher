import equal from 'fast-deep-equal/react';
import React, {useCallback} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {loadApps} from 'react-native-android-apps-list/src';
import colors from '../constants/colors';
import {useAppsListHelper} from './AppsListHelper';

const Header = () => {
  const {setAppsList} = useAppsListHelper();

  const reloadApps = useCallback(async () => {
    try {
      const apps = await loadApps();
      if (apps.length) {
        apps.sort((a, b) => {
          if (a.appName.toLowerCase() < b.appName.toLowerCase()) {
            return -1;
          }
          if (a.appName.toLowerCase() > b.appName.toLowerCase()) {
            return 1;
          }
          return 0;
        });
      }
      const newApps = apps.filter(
        app => app.packageName !== 'com.lucidlauncher',
      );
      setAppsList(newApps);
    } catch (error) {
      console.log(error);
    }
  }, [setAppsList]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Apps</Text>
      <TouchableOpacity onPress={reloadApps}>
        <Image
          source={require('../../assets/reload.png')}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  text: {
    color: colors.text,
    fontSize: 30,
  },
  image: {
    height: 28,
    width: 28,
    marginBottom: 5,
  },
});

export default React.memo(Header, equal);
