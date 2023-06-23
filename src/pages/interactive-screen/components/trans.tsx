import React, {useRef} from 'react';
import {Animated, Dimensions, Text, View} from 'react-native';

const winWidth = Dimensions.get('window').width;

export const Trans = () => {
  const scrollX1 = useRef(new Animated.Value(0)).current;
  const scrollHandler = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: scrollX1,
          },
        },
      },
    ],
    {useNativeDriver: true},
  );

  return (
    <View>
      <Animated.View
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'white',
          transform: [
            {
              translateX: scrollX1.interpolate({
                inputRange: [0, winWidth],
                outputRange: [0, winWidth / 2], // 0 : 150, 0.5 : 75, 1 : 0
              }),
            },
          ],
        }}
      />
      <Animated.ScrollView
        horizontal
        pagingEnabled
        onScroll={scrollHandler}
        showsHorizontalScrollIndicator={false}
        bounces={false}>
        <View style={{width: winWidth, height: 200, backgroundColor: 'blue'}}>
          <Text>1</Text>
        </View>
        <View style={{width: winWidth, height: 200, backgroundColor: 'yellow'}}>
          <Text>2</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
};
