import {Icon} from '@/components';
import styles from './styles/bubble';

import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import dayjs from 'dayjs';

type Props = {
  data: IMessage;
};

const Bubble: FC<Props> = ({data}) => {
  const isClient = data.sender === 'client';
  const bgColor = isClient ? '#C8D2E6' : '#F0F0F5';
  const paddingBottom = data.deleted ? 8 : 20;

  return (
    <View style={styles.container}>
      {data.type === 'system' ? (
        <View style={styles.system}>
          <Text style={{color: 'white'}}>{data.text}</Text>
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={() => {
            if (isClient) return;

            console.debug('onLongPress');
          }}
          style={[
            styles.bubble,
            isClient ? styles.client : styles.server,
            {backgroundColor: bgColor, paddingBottom},
          ]}>
          <Text
            style={{
              color: data.deleted ? 'gray' : 'black',
              fontStyle: data.deleted ? 'italic' : 'normal',
            }}>
            {data.deleted ? 'Message Deleted' : data.text}
          </Text>
          {!data.deleted && (
            <View style={styles.time}>
              <Text style={styles.timeText}>
                {dayjs(data.createdAt).format('HH:mm')}
              </Text>
              {isClient && (
                <Icon size={14} containerSize={14} name="DoubleCheckmark" />
              )}
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Bubble;
