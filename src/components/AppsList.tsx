import {FlashList} from '@shopify/flash-list';
import equal from 'fast-deep-equal/react';
import React, {useCallback, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  loadApps,
  openAppUsingPackageName,
} from 'react-native-android-apps-list/src';
import colors from '../constants/colors';
import {TAppsList, useAppsListHelper} from './AppsListHelper';

const openApp = (item: TAppsList) => () => {
  openAppUsingPackageName(item.packageName);
};

const AppsList = (): JSX.Element => {
  const {appsList, setAppsList} = useAppsListHelper();

  useEffect(() => {
    const getAppsList = async () => {
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
          const newApps = apps.filter(
            app => app.packageName !== 'com.lucidlauncher',
          );
          setAppsList(newApps);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAppsList();
  }, [setAppsList]);

  const renderItem = useCallback(
    ({item}: {item: TAppsList}) => (
      <TouchableOpacity style={styles.touchable} onPress={openApp(item)}>
        <Text style={styles.text}>{item.appName}</Text>
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={appsList}
        renderItem={renderItem}
        estimatedItemSize={40}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 8,
  },
  touchable: {
    padding: 6,
    paddingHorizontal: 0,
  },
  text: {
    color: colors.text,
    fontSize: 20,
  },
});

export default React.memo(AppsList, equal);
