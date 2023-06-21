import React, {useRef} from 'react';
import {Animated, Dimensions, Text, View} from 'react-native';

const winWidth = Dimensions.get('window').width;

export const Swiper = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const height = scrollX.interpolate({
    inputRange: [0, winWidth],
    outputRange: [100, 200],
  });

  return (
    <Animated.View style={{height, backgroundColor: 'red'}}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        showsHorizontalScrollIndicator={false}
        bounces={false}>
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
