import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Colors from '../constants/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppsListModule from '../AppsListModule';

const appItem = ({ item }) => {
      openAppHandler = () => {
            AppsListModule.openAppUsingPackageName(item.packageName);
      };

      return (
            <View style={styles.container}>
                  <TouchableOpacity onPress={openAppHandler} style={styles.appButton}>
                        <Text style={styles.appName}>{item.appName}</Text>
                  </TouchableOpacity>
            </View>
      );
};

const styles = StyleSheet.create({
      container: {
            flex: 1,
            width: wp(80),
      },
      appButton: {
            paddingVertical: hp(1)
      },
      appName: {
            color: Colors.textColor,
            textAlign: 'left',
            fontSize: 25,
            fontFamily: 'SourceSansPro-Regular'
      }
});

export default appItem;
