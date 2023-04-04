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
import React, {useState} from 'react';
import {FlatList, Image, StyleSheet} from 'react-native';
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
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={{
          tabBarStyle: {backgroundColor: '#000'},
          headerShown: false,
          tabBarActiveTintColor: 'white',
        }}>
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({focused}) => (
              <Image
                source={require('./src/assets/images/home.png')}
                style={[
                  styles.bottomTabIcon,
                  focused && styles.bottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Discover"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Discover',
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({focused}) => (
              <Image
                source={require('./src/assets/images/search.png')}
                style={[
                  styles.bottomTabIcon,
                  focused && styles.bottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="NewVideo"
          component={HomeScreen}
          options={{
            tabBarLabel: () => null,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({focused}) => (
              <Image
                source={require('./src/assets/images/new-video.png')}
                style={[
                  styles.newVideo,
                  // focused && styles.bottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Inbox"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Inbox',
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({focused}) => (
              <Image
                source={require('./src/assets/images/message.png')}
                style={[
                  styles.bottomTabIcon,
                  focused && styles.bottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Profile',
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({focused}) => (
              <Image
                source={require('./src/assets/images/user.png')}
                style={[
                  styles.bottomTabIcon,
                  focused && styles.bottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
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
