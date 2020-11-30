import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import AppsListModule from './AppsListModule';
import Colors from './constants/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Dock from './components/Dock';
import AppList from './components/AppList';

const app = () => {
      const [appList, setAppList] = useState(null);
      const [loading, setLoading] = useState(true);

      lastTap = null;
      handleDoubleTap = () => {
            if (!appList.find((app) => app.packageName === 'com.anirudhapps.ylocker')) {
                  return;
            }
            const now = Date.now();
            const DOUBLE_PRESS_DELAY = 300;
            if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
                  AppsListModule.openAppUsingPackageName('com.anirudhapps.ylocker');
            } else {
                  lastTap = now;
            }
      };

      useEffect(() => {
            AppsListModule.loadApps().then((result) => {
                  const apps = result.filter(
                        (app) =>
                              app.packageName !== 'com.lucidlauncher' &&
                              app.packageName !== 'com.android.stk' &&
                              app.packageName !== 'rkr.simplekeyboard.inputmethod'
                  );
                  apps.sort((a, b) => {
                        if (a.appName < b.appName) {
                              return -1;
                        }
                        if (a.appName > b.appName) {
                              return 1;
                        }
                        return 0;
                  });
                  setAppList(apps);
                  setLoading(false);
            });
      }, []);

      const refreshAppsHandler = () => {
            setLoading(true);
            AppsListModule.loadApps().then((result) => {
                  const apps = result.filter(
                        (app) =>
                              app.packageName !== 'com.lucidlauncher' &&
                              app.packageName !== 'com.android.stk' &&
                              app.packageName !== 'rkr.simplekeyboard.inputmethod'
                  );
                  apps.sort((a, b) => {
                        if (a.appName < b.appName) {
                              return -1;
                        }
                        if (a.appName > b.appName) {
                              return 1;
                        }
                        return 0;
                  });
                  setAppList(apps);
                  setLoading(false);
            });
      };

      let LoadingComponent = (
            <View style={styles.spinner}>
                  <ActivityIndicator size={'large'} color={Colors.textColor} />
            </View>
      );

      if (!loading) {
            LoadingComponent = <AppList appList={appList} />;
      }
      return (
            <TouchableWithoutFeedback onPress={handleDoubleTap}>
                  <View style={styles.container}>
                        <StatusBar backgroundColor={Colors.backgroundColor} />
                        <View style={styles.headerView}>
                              <Text style={styles.header}>Apps</Text>
                              <TouchableOpacity onPress={refreshAppsHandler} disabled={loading}>
                                    <Icon name={'reload1'} size={22} color={Colors.textColor} style={styles.rotateIcon} />
                              </TouchableOpacity>
                        </View>
                        {LoadingComponent}
                        <Dock />
                  </View>
            </TouchableWithoutFeedback>
      );
};

const styles = StyleSheet.create({
      container: {
            flex: 1,
            backgroundColor: Colors.backgroundColor,
            alignItems: 'center',
            marginTop: StatusBar.currentHeight,
      },
      spinner: {
            flex: 1,
            alignItems: 'center',
            marginTop: hp(10),
      },
      headerView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: wp(80),
            alignItems: 'center',
            marginBottom: hp(3),
      },
      header: {
            fontSize: 40,
            color: Colors.textColor,
            fontFamily: 'SourceSansPro-Regular',
      },
      rotateIcon: {
            transform: [{ rotate: '70deg' }],
      },
});

export default app;
