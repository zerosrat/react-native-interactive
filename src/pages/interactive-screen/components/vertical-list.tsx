import React, {useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';

import {Swiper} from './swiper';
import {useTabsContent} from '../hooks';
import {Swiper as SwiperOld} from './swiper.old';
// import {Trans} from './trans';
// import AnimateBox from './abox';

export const VerticalList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const {bar, content} = useTabsContent();

  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollHandler = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: scrollY,
          },
        },
      },
    ],
    {useNativeDriver: true},
  );
  const opacity = scrollY.interpolate({
    inputRange: [0, 200 - navbarHeight],
    outputRange: [0, 1],
  });

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
          <SwiperOld />
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
    <View style={styles.container}>
      <Animated.View style={[styles.navbar, {opacity}]}>
        <Text style={{backgroundColor: 'red'}}>back</Text>
      </Animated.View>
      <Animated.FlatList
        data={[0, 1, 2]}
        renderItem={renderItem}
        keyExtractor={item => item + ''}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        stickyHeaderIndices={[1]}
        style={styles.list}
        onScroll={scrollHandler}
      />
    </View>
  );
};

const winWidth = Dimensions.get('window').width;
const statusBarHeight = StatusBar.currentHeight || 0;
const navbarHeight = statusBarHeight + 44;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    width: winWidth,
    height: navbarHeight,
    padding: statusBarHeight,
    backgroundColor: '#fff',
    zIndex: 99,
  },

  list: {
    flex: 1,
  },
  top: {
    // height: 400,
    backgroundColor: 'orange',
  },
  topContent: {
    paddingTop: statusBarHeight,
    height: 100,
  },
  tabs: {
    height: 50,
    backgroundColor: 'pink',
  },
});
