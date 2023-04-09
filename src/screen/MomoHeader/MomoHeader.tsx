import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  Animated,
} from 'react-native';
import React, {useRef} from 'react';
import {ScrollView} from 'react-native';
import {WINDOW_HEIGHT} from '../../utils/utils';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const MomoHeader = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const lastOffsetY = useRef(0);
  const scrollDirection = useRef('');
  const searchInputAnimation = {
    transform: [
      {
        scaleX: animatedValue.interpolate({
          inputRange: [0, 50],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      },
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 25],
          outputRange: [0, -100],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };
  const featureNameAnimation = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 30],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 30],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };

  const depositAnimation = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 80],
          outputRange: [0, 36],
          extrapolate: 'clamp',
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 100],
          outputRange: [0, -55],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
  const withdrawAnimation = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 80],
          outputRange: [0, -16],
          extrapolate: 'clamp',
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 100],
          outputRange: [0, -55],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
  const qrAnimation = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 80],
          outputRange: [0, -56],
          extrapolate: 'clamp',
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 100],
          outputRange: [0, -55],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
  const scanAnimation = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 80],
          outputRange: [0, -92],
          extrapolate: 'clamp',
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 100],
          outputRange: [0, -55],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const featureIconCircleAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };

  const featureIconAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor="#AF0C6E" />
      <SafeAreaView>
        <View style={styles.upperHeaderPlaceHolder}>{}</View>
      </SafeAreaView>
      <SafeAreaView style={styles.header}>
        <View style={styles.upperHeader}>
          <View style={styles.searchContainer}>
            <Image
              source={require('./assets/search.png')}
              style={[styles.icon16]}
            />
            <AnimatedTextInput
              placeholder="Tìm kiếm"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              style={[styles.searchInput, searchInputAnimation]}
            />
          </View>
          <Image
            source={require('./assets/bell.png')}
            style={[styles.bellIcon]}
          />
          <Image
            source={require('./assets/avatar.png')}
            style={[styles.avatar]}
          />
        </View>
        <View style={styles.lowerHeader}>
          <Animated.View style={[styles.feature, depositAnimation]}>
            <Animated.Image
              source={require('./assets/deposit.png')}
              style={[styles.featureIcon, featureIconAnimation]}
            />
            <Animated.Image
              source={require('./assets/deposit-circle.png')}
              style={[styles.icon32, featureIconCircleAnimation]}
            />
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              NẠP TIỀN
            </Animated.Text>
          </Animated.View>
          <Animated.View style={[styles.feature, withdrawAnimation]}>
            <Animated.Image
              source={require('./assets/withdraw.png')}
              style={[styles.featureIcon, featureIconAnimation]}
            />
            <Animated.Image
              source={require('./assets/withdraw-circle.png')}
              style={[styles.icon32, featureIconCircleAnimation]}
            />
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              RÚT TIỀN
            </Animated.Text>
          </Animated.View>
          <Animated.View style={[styles.feature, qrAnimation]}>
            <Animated.Image
              source={require('./assets/qr.png')}
              style={[styles.featureIcon, featureIconAnimation]}
            />
            <Animated.Image
              source={require('./assets/qr-circle.png')}
              style={[styles.icon32, featureIconCircleAnimation]}
            />
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              MÃ QR
            </Animated.Text>
          </Animated.View>
          <Animated.View style={[styles.feature, scanAnimation]}>
            <Animated.Image
              source={require('./assets/scan.png')}
              style={[styles.featureIcon, featureIconAnimation]}
            />
            <Animated.Image
              source={require('./assets/scan-circle.png')}
              style={[styles.icon32, featureIconCircleAnimation]}
            />
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              QUÉT MÃ
            </Animated.Text>
          </Animated.View>
        </View>
      </SafeAreaView>
      <ScrollView
        ref={scrollViewRef}
        onScroll={e => {
          const offsetY = e.nativeEvent.contentOffset.y;
          scrollDirection.current =
            offsetY - lastOffsetY.current > 0 ? 'down' : 'up';
          lastOffsetY.current = offsetY;
          animatedValue.setValue(offsetY);
        }}
        onScrollEndDrag={() => {
          scrollViewRef.current?.scrollTo({
            y: scrollDirection.current === 'down' ? 100 : 0,
            animated: true,
          });
        }}
        scrollEventThrottle={16}>
        <View style={styles.paddingForHeader} />
        <View style={styles.scrollViewContent} />
      </ScrollView>
    </>
  );
};

export default MomoHeader;

const UPPER_HEADER_HEIGHT = 40;
const LOWER_HEADER_HEIGHT = 96;
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#AF0C6E',
  },
  upperHeaderPlaceHolder: {
    height: UPPER_HEADER_HEIGHT,
  },
  upperHeader: {
    height: UPPER_HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  lowerHeader: {
    height: LOWER_HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  scrollViewContent: {
    height: WINDOW_HEIGHT * 2,
    backgroundColor: 'white',
  },
  paddingForHeader: {
    height: LOWER_HEADER_HEIGHT,
  },
  icon16: {
    width: 16,
    height: 16,
    marginLeft: 8,
  },
  searchContainer: {
    // flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  searchInput: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: 'white',
    borderRadius: 4,
    paddingVertical: 4,
    paddingLeft: 32,
  },
  bellIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 32,
  },
  avatar: {
    width: 24,
    height: 24,
  },
  feature: {
    alignItems: 'center',
  },
  featureName: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 14,
    color: '#FFFFFF',
    marginTop: 12,
  },
  icon32: {
    width: 32,
    height: 32,
  },
  featureIcon: {
    width: 16,
    height: 16,
    position: 'absolute',
    top: 8,
  },
});
