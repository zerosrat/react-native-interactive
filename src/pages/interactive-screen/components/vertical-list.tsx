import React, {useState, useCallback} from 'react';
import {StyleSheet, Text, View, RefreshControl, Dimensions} from 'react-native';
import Animated, {
  useDerivedValue,
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Swiper} from './swiper';
import {useTabsContent} from '../hooks';
// import {Swiper as SwiperOld} from './swiper.old';
// import {Trans} from './trans';
// import AnimateBox from './abox';

export const VerticalList = () => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  const navbarHeight = statusBarHeight + navbarContentHeight;

  const [refreshing, setRefreshing] = useState(false);

  const swiperScrollOffset = useSharedValue(0);
  const topHeight = useDerivedValue(
    () => (swiperScrollOffset.value / winWidth) * 100 + 200,
  );
  const listScrollY = useSharedValue(0);
  const navbarAniStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      listScrollY.value,
      [0, topHeight.value - navbarHeight],
      [0, 1],
    );

    return {
      opacity,
    };
  }, [navbarHeight]);

  const {bar, content} = useTabsContent();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      listScrollY.value = event.contentOffset.y;
    },
  });

  const renderItem = ({index}: {index: number}) => {
    if (index === 0) {
      return (
        <View style={[styles.top]}>
          <View style={[styles.topContent, {paddingTop: statusBarHeight}]}>
            <Text>top</Text>
          </View>

          {/* <AnimateBox /> */}
          <Swiper scrollOffset={swiperScrollOffset} />
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
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.navbar,
          {paddingTop: statusBarHeight, height: navbarHeight},
          navbarAniStyle,
        ]}>
        <Text style={{backgroundColor: 'red'}}>back</Text>
      </Animated.View>
      <Animated.FlatList
        data={[0, 1, 2]}
        renderItem={renderItem}
        keyExtractor={item => item + ''}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        // stickyHeaderIndices={[1]}
        style={styles.list}
        onScroll={scrollHandler}
      />
    </View>
  );
};

const winWidth = Dimensions.get('window').width;
const navbarContentHeight = 44;

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
    height: 100,
  },
  tabs: {
    height: 50,
    backgroundColor: 'pink',
  },
});
