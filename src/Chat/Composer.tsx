import styles from './styles/composer';

import React, {FC, memo, useCallback, useEffect, useRef, useState} from 'react';
import {TextInput, Keyboard, View, Alert} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import axios from 'axios';

import {Icon} from '@/components';
import {useAppSelector} from '@/hooks/stores';
import {isConnected} from '@/stores/selectors/chat';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {};

const Composer: FC<Props> = () => {
  const {bottom} = useSafeAreaInsets();
  const connected = useAppSelector(isConnected);
  const inputRef = useRef<TextInput>(null);
  const [text, setText] = useState('');

  const posY = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: posY.value}],
    };
  });

  const animation = useCallback((to: number) => {
    posY.value = withTiming(to, {duration: 200});
  }, []);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardWillShow', e => {
      console.debug('keyboardWillShow', e);
      animation(-(e.endCoordinates.height - bottom));
    });

    const keyboardWillHide = Keyboard.addListener('keyboardWillHide', e => {
      console.debug('keyboardWillHide', e);
      animation(0);
    });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const onSend = async () => {
    if (!connected) return;
    if (!text) return;

    Keyboard.dismiss();
    inputRef.current?.blur();

    try {
      const res = await axios.post(
        'http://localhost:3000/api/sendSocketMessage',
        {
          message: {
            text,
            sender: 'client',
          },
        },
      );
      console.debug('res => ', res);
      inputRef.current?.clear();
      setText('');
    } catch (error) {
      console.debug('SendMessage Error -> ', error);

      Alert.alert('Alert', 'Mesaj gönderilemedi.', [
        {text: 'Tamam', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.inner}>
        <Icon color={'gray'} name="Attachment" />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="New message"
            onChangeText={setText}
            value={text}
            ref={inputRef}
            style={styles.input}
          />
        </View>
      </View>
      <Icon
        onClick={onSend}
        color={'white'}
        bgColor={'#325FAA'}
        containerSize={40}
        name="Send"
      />
    </Animated.View>
  );
};

export default memo(Composer, () => true);
