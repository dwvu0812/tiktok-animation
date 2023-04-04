import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React, {useCallback, useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Video from 'react-native-video';
import getMusicNoteAnimation, {
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '../utils/utils';
import {VideoModel} from '../videosData';

type Props = {
  data: VideoModel;
  isActive: boolean;
};

const VideoItem = ({data, isActive}: Props) => {
  const {id, channelName, uri, caption, musicName, likes, comments, avatarUri} =
    data;

  const discAnimatedValue = useRef(new Animated.Value(0)).current;
  const musicNoteAnimatedValue1 = useRef(new Animated.Value(0)).current;
  const musicNoteAnimatedValue2 = useRef(new Animated.Value(0)).current;
  const disAnimation = {
    transform: [
      {
        rotate: discAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  const musicNoteAnimation1 = getMusicNoteAnimation(
    musicNoteAnimatedValue1,
    false,
  );

  const musicNoteAnimation2 = getMusicNoteAnimation(
    musicNoteAnimatedValue2,
    true,
  );

  const disAnimationRef = useRef();
  const musicAnimationRef = useRef();

  const triggerAnimation = useCallback(() => {
    disAnimationRef.current = Animated.loop(
      Animated.timing(discAnimatedValue, {
        toValue: 1,
        easing: Easing.linear,
        duration: 3000,
        useNativeDriver: true,
      }),
    );
    disAnimationRef.current.start();
    musicAnimationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(musicNoteAnimatedValue1, {
          toValue: 1,
          easing: Easing.linear,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(musicNoteAnimatedValue2, {
          toValue: 1,
          easing: Easing.linear,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    );
    musicAnimationRef.current.start();
  }, []);

  useEffect(() => {
    if (isActive) {
      triggerAnimation();
    } else {
      disAnimationRef.current?.stop();
      musicAnimationRef.current?.stop();
      discAnimatedValue.setValue(0);
      musicNoteAnimatedValue1.setValue(0);
      musicNoteAnimatedValue2.setValue(0);
    }
  }, [
    discAnimatedValue,
    musicNoteAnimatedValue1,
    musicNoteAnimatedValue2,
    isActive,
    triggerAnimation,
  ]);

  const bottomTabHeight = useBottomTabBarHeight();

  return (
    <View style={[styles.container, {height: WINDOW_HEIGHT - bottomTabHeight}]}>
      <StatusBar barStyle={'light-content'} />
      <Video
        source={{uri}}
        style={styles.video}
        resizeMode="cover"
        paused={!isActive}
        repeat
      />
      <View style={styles.bottomSection}>
        <View style={styles.bottomLeftSection}>
          <Text style={styles.channelName}>{channelName}</Text>
          <Text style={styles.caption}>{caption}</Text>
          <View style={styles.musicContainer}>
            <Image
              source={require('../assets/images/music-note.png')}
              style={styles.musicNameIcon}
            />
            <Text style={styles.musicName}>{musicName}</Text>
          </View>
        </View>
        <View style={styles.bottomRightSection}>
          <Animated.Image
            source={require('../assets/images/floating-music-note.png')}
            style={[styles.floatingMusicNote, musicNoteAnimation1]}
          />
          <Animated.Image
            source={require('../assets/images/floating-music-note.png')}
            style={[styles.floatingMusicNote, musicNoteAnimation2]}
          />
          <Animated.Image
            source={require('../assets/images/disc.png')}
            style={[styles.musicDisc, disAnimation]}
          />
        </View>
      </View>
      <View style={styles.verticalBar}>
        <View style={[styles.verticalBarItem, styles.avaContainer]}>
          <Image
            style={styles.avatar}
            source={require('../assets/images/user.png')}
          />
          <View style={styles.followButton}>
            <Image
              source={require('../assets/images/plus-button.png')}
              style={styles.followIcon}
            />
          </View>
        </View>
        <View style={styles.verticalBarItem}>
          <Image
            style={styles.verticalBarIcon}
            source={require('../assets/images/heart.png')}
          />
          <Text style={styles.verticalBarText}>{likes}</Text>
        </View>
        <View style={styles.verticalBarItem}>
          <Image
            style={styles.verticalBarIcon}
            source={require('../assets/images/message-circle.png')}
          />
          <Text style={styles.verticalBarText}>{comments}</Text>
        </View>
        <View style={styles.verticalBarItem}>
          <Image
            style={styles.verticalBarIcon}
            source={require('../assets/images/reply.png')}
          />
          <Text style={styles.verticalBarText}>Share</Text>
        </View>
      </View>
    </View>
  );
};

export default VideoItem;

const styles = StyleSheet.create({
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    width: WINDOW_WIDTH,
  },
  bottomSection: {
    flexDirection: 'row',
    height: 100,
    position: 'absolute',
    bottom: 10,
    width: '100%',
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  bottomLeftSection: {
    flex: 4,
  },
  bottomRightSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  channelName: {
    color: 'white',
    fontWeight: 'bold',
  },
  caption: {
    color: 'white',
    marginVertical: 8,
  },
  musicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicNameIcon: {
    width: 12,
    height: 12,
    marginRight: 8,
  },
  musicName: {
    color: 'white',
  },
  musicDisc: {
    width: 40,
    height: 40,
  },
  verticalBar: {
    position: 'absolute',
    right: 8,
    bottom: 72,
  },
  verticalBarItem: {
    marginBottom: 24,
    alignItems: 'center',
  },
  verticalBarIcon: {
    width: 32,
    height: 32,
  },
  verticalBarText: {
    color: 'white',
    marginTop: 4,
  },
  avaContainer: {
    marginBottom: 48,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  followButton: {
    position: 'absolute',
    bottom: -8,
  },
  followIcon: {
    width: 21,
    height: 21,
  },
  floatingMusicNote: {
    position: 'absolute',
    right: 40,
    bottom: 16,
    width: 16,
    height: 16,
    tintColor: 'white',
  },
});
