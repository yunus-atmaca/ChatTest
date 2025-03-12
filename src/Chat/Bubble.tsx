import styles from './styles/bubble';
import OverlayMenu from './OverlayMenu';

import React, {FC, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import dayjs from 'dayjs';

import {Icon} from '@/components';

type Props = {
  data: IMessage;
};

const Bubble: FC<Props> = ({data}) => {
  const bubbleRef = useRef<View>(null);
  const [bubbleAtt, setBubbleAtt] = useState<IElementPos | null>(null);
  const isClient = data.sender === 'client';
  const bgColor = isClient ? '#C8D2E6' : '#F0F0F5';

  const onLongPress = () => {
    //if (!isClient) return;
    if (bubbleAtt) return;

    bubbleRef.current?.measure((x, y, w, h, px, py) => {
      setBubbleAtt({w, h, px, py});
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        ref={bubbleRef}
        activeOpacity={1}
        onLongPress={onLongPress}
        style={[
          styles.bubble,
          isClient ? styles.client : styles.server,
          {backgroundColor: bgColor},
        ]}>
        <Text style={{color: 'black'}}>{data.text}</Text>
        <View style={styles.time}>
          <Text style={styles.timeText}>
            {dayjs(data.createdAt).format('HH:mm')}
          </Text>
          {isClient && (
            <Icon size={14} containerSize={14} name="DoubleCheckmark" />
          )}
        </View>
      </TouchableOpacity>
      {bubbleAtt && (
        <OverlayMenu
          data={data}
          onClickOutside={() => setBubbleAtt(null)}
          pos={bubbleAtt}
        />
      )}
    </View>
  );
};

export default Bubble;
