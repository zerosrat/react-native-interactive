import React from 'react';
import {Dimensions, Text, View, StyleSheet} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

export const Swiper = (props: {scrollOffset: SharedValue<number>}) => {
  const {scrollOffset} = props;
  const height = useDerivedValue(() => {
    return (scrollOffset.value / winWidth) * 100 + 100;
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollOffset.value = event.contentOffset.x;
    },
  });

  return (
    <Animated.View style={animatedStyle}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        style={styles.scrollView}>
        <View style={styles.slide1}>
          <Text>slide 1</Text>
        </View>
        <View style={styles.slide2}>
          <Text>slide 2</Text>
        </View>
      </Animated.ScrollView>
    </Animated.View>
  );
};

const winWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  slide1: {
    width: winWidth,
    height: 100,
    backgroundColor: 'lightskyblue',
  },
  slide2: {
    width: winWidth,
    height: 200,
    backgroundColor: 'lightyellow',
  },
});
