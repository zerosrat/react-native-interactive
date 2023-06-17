import React, {useState, useCallback} from 'react';
import {FlatList, StyleSheet, Text, View, RefreshControl} from 'react-native';

import {ViewPager} from './view-pager';

// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'First Item',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
// ];

export const VerticalList = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderItem = ({index}: {index: number}) => {
    if (index === 0) {
      return (
        <View style={styles.top}>
          <Text>top</Text>
        </View>
      );
    }
    if (index === 1) {
      return (
        <View style={styles.tabs}>
          <Text>tabs</Text>
        </View>
      );
    }

    return <ViewPager />;
  };

  return (
    <FlatList
      data={[0, 1, 2]}
      renderItem={renderItem}
      keyExtractor={item => item + ''}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      stickyHeaderIndices={[1]}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    height: 200,
    backgroundColor: 'orange',
  },
  tabs: {
    height: 50,
    backgroundColor: 'pink',
  },
  list: {
    flex: 1,
  },
});
