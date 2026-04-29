import {useRef, useState} from 'react';
import {
  Animated,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Direction = 'forward' | 'backward';
type Screen = 'direct' | 'nested';

function App() {
  const [screen, setScreen] = useState<Screen>('direct');

  return (
    <View style={styles.app}>
      <View style={styles.tabs}>
        <Pressable
          onPress={() => setScreen('direct')}
          style={[styles.tab, screen === 'direct' && styles.activeTab]}>
          <Text
            style={[
              styles.tabText,
              screen === 'direct' && styles.activeTabText,
            ]}>
            Direct Text
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setScreen('nested')}
          style={[styles.tab, screen === 'nested' && styles.activeTab]}>
          <Text
            style={[
              styles.tabText,
              screen === 'nested' && styles.activeTabText,
            ]}>
            Nested
          </Text>
        </Pressable>
      </View>
      {screen === 'direct' ? <DirectTextScreen /> : <NestedScreen />}
    </View>
  );
}

function DirectTextScreen() {
  const translateX1 = useRef(new Animated.Value(0)).current;
  const translateX2 = useRef(new Animated.Value(0)).current;
  const translateX3 = useRef(new Animated.Value(0)).current;
  const translateX4 = useRef(new Animated.Value(0)).current;
  const translateX5 = useRef(new Animated.Value(0)).current;

  const translateY1 = useRef(new Animated.Value(0)).current;
  const translateY2 = useRef(new Animated.Value(0)).current;
  const translateY3 = useRef(new Animated.Value(0)).current;
  const translateY4 = useRef(new Animated.Value(0)).current;
  const translateY5 = useRef(new Animated.Value(0)).current;

  const animationHandle = ({
    value,
    duration,
    toValue,
  }: {
    value: Animated.Value;
    duration: number;
    toValue: number;
  }) => {
    return Animated.timing(value, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
    });
  };

  const handleTranslateXChange = ({direction}: {direction: Direction}) => {
    return Animated.parallel([
      animationHandle({
        value: translateX1,
        duration: 1000,
        toValue: direction === 'forward' ? 100 : 0,
      }),
      animationHandle({
        value: translateX2,
        duration: 1000,
        toValue: direction === 'forward' ? 200 : 0,
      }),
      animationHandle({
        value: translateX3,
        duration: 1000,
        toValue: direction === 'forward' ? 300 : 0,
      }),
      animationHandle({
        value: translateX4,
        duration: 1000,
        toValue: direction === 'forward' ? 400 : 0,
      }),
      animationHandle({
        value: translateX5,
        duration: 1000,
        toValue: direction === 'forward' ? 500 : 0,
      }),
    ]);
  };

  const handleTranslateYChange = ({direction}: {direction: Direction}) => {
    return Animated.parallel([
      animationHandle({
        value: translateY1,
        duration: 1000,
        toValue: direction === 'forward' ? 100 : 0,
      }),
      animationHandle({
        value: translateY2,
        duration: 1000,
        toValue: direction === 'forward' ? 200 : 0,
      }),
      animationHandle({
        value: translateY3,
        duration: 1000,
        toValue: direction === 'forward' ? 300 : 0,
      }),
      animationHandle({
        value: translateY4,
        duration: 1000,
        toValue: direction === 'forward' ? 400 : 0,
      }),
      animationHandle({
        value: translateY5,
        duration: 1000,
        toValue: direction === 'forward' ? 500 : 0,
      }),
    ]);
  };

  const handleWidthChange = () => {
    Animated.parallel([
      handleTranslateXChange({direction: 'forward'}),
      handleTranslateYChange({direction: 'forward'}),
    ]).start();
  };

  const handleWidthChangeBack = () => {
    Animated.parallel([
      handleTranslateXChange({direction: 'backward'}),
      handleTranslateYChange({direction: 'backward'}),
    ]).start();
  };

  return (
    <ScrollView style={styles.container}>
      <Button onPress={handleWidthChange} title="Change Width" />
      <Button onPress={handleWidthChangeBack} title="Change Width Back" />
      <View>
        <Animated.Text
          style={[
            styles.text,
            {transform: [{translateX: translateX1}, {translateY: translateY1}]},
          ]}>
          안
        </Animated.Text>
        <Animated.Text
          style={[
            styles.text,
            {transform: [{translateX: translateX2}, {translateY: translateY2}]},
          ]}>
          녕
        </Animated.Text>
        <Animated.Text
          style={[
            styles.text,
            {transform: [{translateX: translateX3}, {translateY: translateY3}]},
          ]}>
          하
        </Animated.Text>
        <Animated.Text
          style={[
            styles.text,
            {transform: [{translateX: translateX4}, {translateY: translateY4}]},
          ]}>
          세
        </Animated.Text>
        <Animated.Text
          style={[
            styles.text,
            {transform: [{translateX: translateX5}, {translateY: translateY5}]},
          ]}>
          요
        </Animated.Text>
      </View>
    </ScrollView>
  );
}

function NestedScreen() {
  const translateX1 = useRef(new Animated.Value(0)).current;
  const translateX2 = useRef(new Animated.Value(0)).current;
  const translateX3 = useRef(new Animated.Value(0)).current;
  const translateX4 = useRef(new Animated.Value(0)).current;
  const translateX5 = useRef(new Animated.Value(0)).current;

  const translateY1 = useRef(new Animated.Value(0)).current;
  const translateY2 = useRef(new Animated.Value(0)).current;
  const translateY3 = useRef(new Animated.Value(0)).current;
  const translateY4 = useRef(new Animated.Value(0)).current;
  const translateY5 = useRef(new Animated.Value(0)).current;

  const animationHandle = ({
    value,
    duration,
    toValue,
  }: {
    value: Animated.Value;
    duration: number;
    toValue: number;
  }) => {
    return Animated.timing(value, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
    });
  };

  const handleTranslateXChange = ({direction}: {direction: Direction}) => {
    return Animated.parallel([
      animationHandle({
        value: translateX1,
        duration: 1000,
        toValue: direction === 'forward' ? 100 : 0,
      }),
      animationHandle({
        value: translateX2,
        duration: 1000,
        toValue: direction === 'forward' ? 200 : 0,
      }),
      animationHandle({
        value: translateX3,
        duration: 1000,
        toValue: direction === 'forward' ? 300 : 0,
      }),
      animationHandle({
        value: translateX4,
        duration: 1000,
        toValue: direction === 'forward' ? 400 : 0,
      }),
      animationHandle({
        value: translateX5,
        duration: 1000,
        toValue: direction === 'forward' ? 500 : 0,
      }),
    ]);
  };

  const handleTranslateYChange = ({direction}: {direction: Direction}) => {
    return Animated.parallel([
      animationHandle({
        value: translateY1,
        duration: 1000,
        toValue: direction === 'forward' ? 100 : 0,
      }),
      animationHandle({
        value: translateY2,
        duration: 1000,
        toValue: direction === 'forward' ? 200 : 0,
      }),
      animationHandle({
        value: translateY3,
        duration: 1000,
        toValue: direction === 'forward' ? 300 : 0,
      }),
      animationHandle({
        value: translateY4,
        duration: 1000,
        toValue: direction === 'forward' ? 400 : 0,
      }),
      animationHandle({
        value: translateY5,
        duration: 1000,
        toValue: direction === 'forward' ? 500 : 0,
      }),
    ]);
  };

  const handleWidthChange = () => {
    Animated.parallel([
      handleTranslateXChange({direction: 'forward'}),
      handleTranslateYChange({direction: 'forward'}),
    ]).start();
  };

  const handleWidthChangeBack = () => {
    Animated.parallel([
      handleTranslateXChange({direction: 'backward'}),
      handleTranslateYChange({direction: 'backward'}),
    ]).start();
  };

  return (
    <ScrollView style={styles.container}>
      <Button onPress={handleWidthChange} title="Change Width" />
      <Button onPress={handleWidthChangeBack} title="Change Width Back" />
      <View>
        <Animated.View
          style={[
            styles.text,
            {transform: [{translateX: translateX1}, {translateY: translateY1}]},
          ]}>
          <Text>안</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.text,
            {transform: [{translateX: translateX2}, {translateY: translateY2}]},
          ]}>
          <Text>녕</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.text,
            {transform: [{translateX: translateX3}, {translateY: translateY3}]},
          ]}>
          <Text>하</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.text,
            {transform: [{translateX: translateX4}, {translateY: translateY4}]},
          ]}>
          <Text>세</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.text,
            {transform: [{translateX: translateX5}, {translateY: translateY5}]},
          ]}>
          <Text>요</Text>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabs: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 0,
    gap: 8,
    backgroundColor: 'white',
  },
  tab: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
  },
  activeTab: {
    backgroundColor: '#111111',
  },
  tabText: {
    color: '#111111',
    fontWeight: '600',
  },
  activeTabText: {
    color: 'white',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  animatedView: {
    flex: 1,
    backgroundColor: 'red',
  },
  text: {
    width: '100%',
    height: 50,
    marginBottom: 16,
    backgroundColor: 'blue',
  },
});

export default App;
