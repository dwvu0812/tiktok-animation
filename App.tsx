/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Animated,
  PanResponder,
} from 'react-native';
import MomoHeader from './src/screen/MomoHeader';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from './src/utils/utils';

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.6;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.1;
const MAX_UPWARD_TRANSLATE_Y =
  BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

function App(): JSX.Element {
  const animatedValue = useRef(new Animated.Value(0)).current;
  // console.log('animatedValue ', animatedValue);
  let lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.flattenOffset();
        lastGestureDy.current += gesture.dy;
        // if (lastGestureDy.current < MAX_UPWARD_TRANSLATE_Y) {
        //   lastGestureDy.current = MAX_UPWARD_TRANSLATE_Y;
        // } else if (lastGestureDy.current > MAX_DOWNWARD_TRANSLATE_Y) {
        //   lastGestureDy.current = MAX_DOWNWARD_TRANSLATE_Y;
        // }

        if (gesture.dy > 0) {
          if (gesture.dy <= DRAG_THRESHOLD) {
            springAnimation('up');
          } else {
            springAnimation('down');
          }
        } else {
          if (gesture.dy >= -DRAG_THRESHOLD) {
            springAnimation('down');
          } else {
            springAnimation('up');
          }
        }
      },
    }),
  ).current;

  const springAnimation = (direction: 'up' | 'down') => {
    lastGestureDy.current =
      direction === 'up' ? MAX_UPWARD_TRANSLATE_Y : MAX_DOWNWARD_TRANSLATE_Y;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.dragHandleArea} {...panResponder.panHandlers}>
          <View style={styles.dragHandle} />
        </View>
      </Animated.View> */}
      <MomoHeader />
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'grey',
  },
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    ...Platform.select({
      android: {elevation: 10},
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  dragHandle: {
    width: 100,
    height: 6,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
  },
  dragHandleArea: {
    width: 132,
    height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
});
