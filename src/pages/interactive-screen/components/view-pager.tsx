import React from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollViewProps,
} from 'react-native';

const DATA = Array(10)
  .fill('')
  .map((_, index) => ({
    id: index + '',
    title: `Item ${index}`,
  }));

const Item = ({title}: {title: string}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export const ViewPager = (props: {onScroll?: ScrollViewProps['onScroll']}) => {
  const {onScroll} = props;
  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      onScroll={onScroll}
      scrollEventThrottle={1}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  list: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});
