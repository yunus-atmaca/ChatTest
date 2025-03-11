import Header from './Header';
import Composer from './Composer';
import Messages from './Messages';

import React, {useEffect} from 'react';
import {io} from 'socket.io-client';

import {Page} from '@/components';
import {useAppDispatch} from '@/hooks/stores';
import {appendMessage, setConnected} from '@/stores/controllers/chat';
import {View} from 'react-native';

const Chat = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.debug('useEffect');

    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('Connected to chat server');
      dispatch(setConnected(true));
    });

    // Listen for new messages
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

      // Update your UI with the new message
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from chat server');
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
      <View style={{flex: 1}}>
        <Messages />
      </View>
      <Composer />
    </Page>
  );
};

export default Chat;
