import React from 'react';
import {
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

const DATA = Array(100)
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

export const ViewPager = () => {
  return (
    <ScrollView horizontal pagingEnabled>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        style={styles.list}
        stickyHeaderIndices={[10]}
      />
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        style={styles.list}
        stickyHeaderIndices={[10]}
      />
    </ScrollView>
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
