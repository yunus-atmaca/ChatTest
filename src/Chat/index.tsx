import Header from './Header';
import Composer from './Composer';
import Messages from './Messages';

import React, {useCallback, useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import {View} from 'react-native';

import {Page} from '@/components';
import {useAppDispatch} from '@/hooks/stores';
import {
  appendMessage,
  setConnected,
  setInitialMessages,
} from '@/stores/controllers/chat';
import {Storage} from '@/utils';

const Chat = () => {
  const dispatch = useAppDispatch();
  const [localReady, setLocalReady] = useState(false);

  const fetchInitialMessages = useCallback(async () => {
    const res = await Storage.load(Storage.KEYS.MESSAGES);

    console.debug('local messages -> ', res);
    if (res) {
      dispatch(setInitialMessages(JSON.parse(res as string)));
    }

    setLocalReady(true);
  }, [dispatch]);

  useEffect(() => {
    fetchInitialMessages();

    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('Connected to chat server');
      dispatch(setConnected(true));
    });

    socket.on('newMessage', data => {
      console.log('New message received:', data.message);
      console.debug('typeof -> ', typeof data.message);

      if (typeof data.message === 'object') {
        const {text, sender} = data.message;
        dispatch(appendMessage({text, sender, createdAt: data.timestamp}));
      } else if (typeof data.message === 'string') {
        dispatch(
          appendMessage({
            text: data.message,
            sender: 'server',
            createdAt: data.timestamp,
          }),
        );
      } else {
        dispatch(
          appendMessage({
            text: JSON.stringify(data.message),
            sender: 'server',
            createdAt: data.timestamp,
          }),
        );
      }
    });

    socket.on('disconnect', () => {
      dispatch(setConnected(false));
    });

    return () => {
      socket.disconnect();
      socket.close();
    };
  }, []);

  return (
    <Page>
      <Header />
      {localReady && (
        <>
          <View style={{flex: 1}}>
            <Messages />
          </View>
          <Composer />
        </>
      )}
    </Page>
  );
};

export default Chat;
