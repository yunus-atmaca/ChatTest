import Header from './Header';

import React, {useEffect} from 'react';
import {View} from 'react-native';
import {io} from 'socket.io-client';

import {Page} from '@/components';

const Chat = () => {
  useEffect(() => {
    console.debug('useEffect');

    const socket = io('http://localhost:3000');


    socket.on('connect', () => {
      console.log('Connected to chat server');
    });

    // Listen for new messages
    socket.on('newMessage', data => {
      console.log('New message received:', data.message);
      // Update your UI with the new message
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from chat server');
    });

    return () => {
      socket.disconnect();
      socket.close();
    };
  }, []);

  return (
    <Page>
      <Header />
    </Page>
  );
};

export default Chat;
