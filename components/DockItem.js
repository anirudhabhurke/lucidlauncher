import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import AppsListModule from '../AppsListModule';
import Colors from '../constants/Colors';

const dockItem = (props) => {
      openAppHandler = () => {
            AppsListModule.openAppUsingPackageName(props.packageName);
      };

      let MyIcon = props.isFeather ? FeatherIcon : Icon;

      return (
            <TouchableOpacity onPress={openAppHandler} style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
                  <MyIcon name={props.icon} size={25} color={Colors.textColor} />
            </TouchableOpacity>
      );
};

export default dockItem;
