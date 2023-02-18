import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Linking} from 'react-native';
import equal from 'fast-deep-equal/react';
import colors from '../constants/colors';
import {openAppUsingPackageName} from 'react-native-android-apps-list/src';

const DOCK_APPS = [
  {
    name: 'phone',
    icon: require('../../assets/phone.png'),
    onPress: () => {
      openAppUsingPackageName('com.samsung.android.dialer');
    },
  },
  {
    name: 'sms',
    icon: require('../../assets/sms.png'),
    onPress: () => {
      openAppUsingPackageName('com.microsoft.android.smsorganizer');
    },
  },
  {
    name: 'browser',
    icon: require('../../assets/browser.png'),
    onPress: () => {
      openAppUsingPackageName('com.brave.browser');
    },
  },
  {
    name: 'camera',
    icon: require('../../assets/camera.png'),
    onPress: () => {
      openAppUsingPackageName('com.sec.android.app.camera');
    },
  },
  {
    name: 'files',
    icon: require('../../assets/files.png'),
    onPress: () => {
      openAppUsingPackageName('pl.solidexplorer2');
    },
  },
];

const Dock = (): JSX.Element => {
  return (
    <View style={styles.container}>
      {DOCK_APPS.map(app => (
        <TouchableOpacity
          key={app.name}
          style={styles.touchable}
          onPress={app.onPress}>
          <Image source={app.icon} style={styles.image} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  text: {
    color: colors.text,
  },
  image: {
    height: 30,
    width: 30,
  },
  touchable: {
    padding: 10,
  },
});

export default React.memo(Dock, equal);
