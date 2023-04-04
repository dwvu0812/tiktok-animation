/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  createBottomTabNavigator,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {FlatList, Image, PanResponder, StyleSheet, View} from 'react-native';
import VideoItem from './src/screen/VideoItem';
import {WINDOW_HEIGHT} from './src/utils/utils';
import videosData from './src/videosData';

const HomeScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const bottomTabHeight = useBottomTabBarHeight();
  return (
    <FlatList
      data={videosData}
      pagingEnabled
      renderItem={({item, index}) => (
        <VideoItem data={item} isActive={index === activeIndex} />
      )}
      onScroll={e => {
        const index = Math.round(
          e.nativeEvent.contentOffset.y / (WINDOW_HEIGHT - bottomTabHeight),
        );
        setActiveIndex(index);
      }}
    />
  );
};

const BottomTab = createBottomTabNavigator();

function App(): JSX.Element {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        console.log(gesture);
      },
      onPanResponderRelease: (event, gesture) => {},
    }),
  ).current;
  return <View {...panResponder.panHandlers} style={{flex: 1}} />;
}

export default App;

const styles = StyleSheet.create({
  bottomTabIcon: {
    width: 20,
    height: 20,
    tintColor: 'gray',
  },
  bottomTabIconFocused: {
    tintColor: 'white',
  },
  newVideo: {
    height: 24,
    width: 48,
  },
});
