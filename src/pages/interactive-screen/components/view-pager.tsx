import React from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollViewProps,
  ListRenderItem,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const DATA = Array(10)
  .fill('')
  .map((_, index) => ({
    id: index + '',
    title: `Item ${index}`,
  }));
// const DATA20 = Array(20)
//   .fill('')
//   .map((_, index) => ({
//     id: index + '',
//     title: `Item ${index}`,
//   }));

const Item = ({title}: {title: string}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const SpaceAreaSpace = () => {
  const insets = useSafeAreaInsets();
  return <View style={{height: insets.bottom}} />;
};

export const ViewPager = (props: {onScroll?: ScrollViewProps['onScroll']}) => {
  const {onScroll} = props;
  const renderItem: ListRenderItem<{id: string; title: string}> = ({item}) => (
    <Item title={item.title} />
  );

  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      onScroll={onScroll}
      scrollEventThrottle={1}
      showsHorizontalScrollIndicator={false}
      style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        ListFooterComponent={<SpaceAreaSpace />}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        ListFooterComponent={<SpaceAreaSpace />}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        ListFooterComponent={<SpaceAreaSpace />}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
