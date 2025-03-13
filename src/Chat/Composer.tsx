import styles from './styles/composer';

import React, {FC, memo, useCallback, useEffect, useRef, useState} from 'react';
import {TextInput, Keyboard, View, Alert, Platform} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import axios from 'axios';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Icon} from '@/components';
import {useAppDispatch, useAppSelector} from '@/hooks/stores';
import {SelectChat} from '@/stores/selectors';
import {setEditMessage, editUserMessage} from '@/stores/controllers/chat';

import ENV from '../../env.json';

type Props = {};

const Composer: FC<Props> = () => {
  const {bottom} = useSafeAreaInsets();
  const connected = useAppSelector(SelectChat.isConnected);
  const editMessage = useAppSelector(SelectChat.editMessage);
  const inputRef = useRef<TextInput>(null);
  const [text, setText] = useState('');

  const dispatch = useAppDispatch();

  const posY = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: posY.value}],
    };
  });

  const animation = useCallback((to: number) => {
    posY.value = withTiming(to, {duration: 150});
  }, []);

  useEffect(() => {
    let keyboardDidShow = null;
    let keyboardDidHide = null;
    if (Platform.OS === 'android') {
      keyboardDidShow = Keyboard.addListener('keyboardDidShow', e => {
        //console.debug('keyboardWillShow', e);
        animation(-e.endCoordinates.height);
      });

      keyboardDidHide = Keyboard.addListener('keyboardDidHide', e => {
        //console.debug('keyboardWillHide', e);
        animation(0);
      });
    }

    let keyboardWillShow = null;
    let keyboardWillHide = null;
    if (Platform.OS === 'ios') {
      keyboardWillShow = Keyboard.addListener('keyboardWillShow', e => {
        //console.debug('keyboardWillShow', e);
        animation(-(e.endCoordinates.height - bottom));
      });

      keyboardWillHide = Keyboard.addListener('keyboardWillHide', e => {
        //console.debug('keyboardWillHide', e);
        animation(0);
      });
    }

    return () => {
      if (keyboardWillShow) keyboardWillShow.remove();
      if (keyboardWillHide) keyboardWillHide.remove();

      if (keyboardDidHide) keyboardDidHide.remove();
      if (keyboardDidShow) keyboardDidShow.remove();
    };
  }, []);

  useEffect(() => {
    if (editMessage) {
      inputRef.current?.focus();
      setText(editMessage.text);
    }
  }, [editMessage]);

  const onCancel = () => {
    dispatch(setEditMessage(null));
    inputRef.current?.blur();
    inputRef.current?.clear();
    setText('');
  };

  const onSend = async () => {
    if (!connected) return;
    if (!text) return;

    Keyboard.dismiss();
    inputRef.current?.blur();

    if (editMessage) {
      const message: IMessage = {...editMessage, text: text};
      dispatch(editUserMessage(message));
      onCancel();
    } else {
      try {
        const res = await axios.post(`${ENV.URL}/api/sendSocketMessage`, {
          message: {
            text,
            sender: 'client',
          },
        });
        console.debug('res => ', res);
        inputRef.current?.clear();
        setText('');
      } catch (error) {
        console.debug('SendMessage Error -> ', error);

        Alert.alert('Alert', 'Mesaj gönderilemedi.', [
          {text: 'Tamam', onPress: () => console.log('OK Pressed')},
        ]);
      }
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
      {editMessage && (
        <Icon
          onClick={onCancel}
          containerStyle={{marginEnd: 8}}
          color={'white'}
          bgColor={'red'}
          containerSize={40}
          name={'Close'}
        />
      )}
      <Icon
        onClick={onSend}
        color={'white'}
        bgColor={'#325FAA'}
        containerSize={40}
        name={editMessage ? 'Check' : 'Send'}
      />
    </Animated.View>
  );
};

export default memo(Composer, () => true);
