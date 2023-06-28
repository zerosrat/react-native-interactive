import React, {useState, useCallback} from 'react';
import {FlatList, StyleSheet, Text, View, RefreshControl} from 'react-native';

import {Swiper} from './swiper';
import {useTabsContent} from '../hooks';
// import {Swiper as SwiperOld} from './swiper.old';
// import {Trans} from './trans';
// import AnimateBox from './abox';

export const VerticalList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const {bar, content} = useTabsContent();

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
          <View style={styles.topContent}>
            <Text>top</Text>
          </View>

          {/* <AnimateBox /> */}
          <Swiper />
          {/* <SwiperOld /> */}
          {/* <Trans /> */}
        </View>
      );
    }
    if (index === 1) {
      return bar;
    }

    return content;
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
  topContent: {
    height: 100,
  },
  tabs: {
    height: 50,
    backgroundColor: 'pink',
  },
  list: {
    flex: 1,
  },
});
