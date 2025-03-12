import styles from './styles/aDayChats';

import Bubble from './Bubble';

import React, {FC, memo} from 'react';
import {View, Text} from 'react-native';

type Props = {
  data: IADayChat;
};

const ADayChats: FC<Props> = ({data}) => {
  const renderMessage = (item: IMessage) => {
    return <Bubble key={item.id} data={item} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.day}>
        <Text style={{color: 'white'}}>{data.day}</Text>
      </View>
      {data.messages.map(m => renderMessage(m))}
    </View>
  );
};

export default ADayChats;
