import React, {useState, useCallback} from 'react';
import {FlatList, StyleSheet, Text, View, RefreshControl} from 'react-native';

import {ViewPager} from './view-pager';
import {Swiper} from './swiper';
// import AnimateBox from './abox';

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
          {/* <AnimateBox /> */}
          <Swiper />
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
    // height: 400,
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
