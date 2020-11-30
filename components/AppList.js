import React from 'react';
import { FlatList } from 'react-native';
import AppItem from './AppItem';

const appList = (props) => {
      return (
            <FlatList
                  keyExtractor={(item) => `${item.packageName}.${item.appName}`}
                  data={props.appList}
                  renderItem={({ item }) => {
                        return <AppItem item={item} />;
                  }}
                  showsVerticalScrollIndicator={false}
            ></FlatList>
      );
};

export default appList;
