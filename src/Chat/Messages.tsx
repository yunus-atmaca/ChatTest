import Bubble from './Bubble';

import React, {useEffect} from 'react';
import {FlatList, ListRenderItem} from 'react-native';

import {useAppDispatch, useAppSelector} from '@/hooks/stores';
import {SelectChat} from '@/stores/selectors';
import {appendMessage} from '@/stores/controllers/chat';

const Messages = () => {
  const messages = useAppSelector(SelectChat.messages);
  const dispatch = useAppDispatch();

  useEffect(() => {
    //dispatch(appendMessage());
  }, []);

  const renderMessage: ListRenderItem<IMessage> = ({item}) => {
    return <Bubble data={item} />;
  };

  return <FlatList inverted renderItem={renderMessage} data={messages} />;
};

export default Messages;
