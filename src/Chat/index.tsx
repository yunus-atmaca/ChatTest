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
  setInitialChats,
} from '@/stores/controllers/chat';
import {Storage} from '@/utils';

import ENV from '../../env.json';

const Chat = () => {
  const dispatch = useAppDispatch();
  const [localReady, setLocalReady] = useState(false);

  const fetchInitialChats = useCallback(async () => {
    //Storage.remove(Storage.KEYS.CHATS);
    //return;
    const res = (await Storage.load(Storage.KEYS.CHATS)) as string;

    if (res) dispatch(setInitialChats(JSON.parse(res)));

    setLocalReady(true);
  }, [dispatch]);

  useEffect(() => {
    fetchInitialChats();

    const socket = io(ENV.URL);

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
