import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';

const winWidth = Dimensions.get('window').width;

export const Swiper = () => {
  const scrollOffset = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: (scrollOffset.value / winWidth) * 200 + 200,
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
        style-={{flex: 1}}>
        <View style={{width: winWidth, height: 200, backgroundColor: 'blue'}}>
          <Text>1</Text>
        </View>
        <View style={{width: winWidth, height: 400, backgroundColor: 'yellow'}}>
          <Text>2</Text>
        </View>
      </Animated.ScrollView>
    </Animated.View>
  );
};
