import Bubble from './Bubble';
import ADayChats from './ADayChats';

import React, {useEffect} from 'react';
import {FlatList, ListRenderItem} from 'react-native';

import {useAppDispatch, useAppSelector} from '@/hooks/stores';
import {SelectChat} from '@/stores/selectors';
import {appendMessage} from '@/stores/controllers/chat';

const Messages = () => {
  //const messages = useAppSelector(SelectChat.messages);
  const chats = useAppSelector(SelectChat.aDayChats);
  const dispatch = useAppDispatch();

  useEffect(() => {
    //dispatch(appendMessage());
  }, []);

  const renderMessage: ListRenderItem<IADayChat> = ({item}) => {
    return <ADayChats data={item} />;
  };

  return <FlatList inverted renderItem={renderMessage} data={chats} />;
};

export default Messages;
