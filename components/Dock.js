import React from 'react';
import { View, StyleSheet } from 'react-native';
import DockItem from './DockItem';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../constants/Colors';

const dock = () => {
      const appOptions = [
            { icon: 'phone', packageName: 'com.simplemobiletools.dialer', isFeather: true },
            { icon: 'message1', packageName: 'com.simplemobiletools.smsmessenger' },
            { icon: 'folder1', packageName: 'pl.solidexplorer2' },
            { icon: 'setting', packageName: 'com.android.settings' },
      ];

      return (
            <View style={styles.container}>
                  {appOptions.map((app) => (
                        <DockItem icon={app.icon} packageName={app.packageName} isFeather={app.isFeather} key={app.packageName} />
                  ))}
            </View>
      );
};

const styles = StyleSheet.create({
      container: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: wp(100),
            margin: wp(5),
      },
});

export default dock;
