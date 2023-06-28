import React, {useRef, useMemo} from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {ViewPager} from '../components/view-pager';

export const useTabsContent = () => {
  const winDim = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollHandler = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: scrollX,
          },
        },
      },
    ],
    {useNativeDriver: true},
  );
  const translateX = scrollX.interpolate({
    inputRange: [0, winDim.width],
    outputRange: [0, 100],
  });

  const bar = useMemo(
    () => (
      <View style={styles.tabs}>
        <View style={styles.tabContainer}>
          <Text>tab1</Text>
        </View>
        <View style={styles.tabContainer}>
          <Text>tab2</Text>
        </View>
        <View style={styles.tabContainer}>
          <Text>tab3</Text>
        </View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [
                {
                  translateX,
                },
              ],
            },
          ]}
        />
      </View>
    ),
    [translateX],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const content = useMemo(() => <ViewPager onScroll={scrollHandler} />, []);

  return {bar, content};
};

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'pink',
  },
  tabContainer: {
    alignItems: 'center',
    width: 100,
    height: 50,
  },
  bar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 100,
    height: 4,
    backgroundColor: 'yellow',
  },
});
