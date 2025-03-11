import styles from './styles';

import React, {FC} from 'react';
import {
  ColorValue,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import * as Icons from '@/assets/icons';

export type IconNames = keyof typeof Icons;

export type Props = {
  name: IconNames;
  size?: number;
  containerSize?: number;
  color?: ColorValue;
  bgColor?: ColorValue;
  onClick?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

const Icon: FC<Props> = ({
  size = 20,
  containerSize = 32,
  name,
  color = '#325FAA',
  bgColor = 'transparent',
  onClick,
  containerStyle,
}) => {
  const IconContainer = onClick ? TouchableOpacity : View;

  return (
    <IconContainer
      style={[
        styles.container,
        {
          height: containerSize,
          width: containerSize,
          backgroundColor: bgColor,
        },
        containerStyle,
      ]}
      onPress={onClick}
      activeOpacity={0.7}>
      <View style={{height: size, width: size}}>
        {Icons[name]({color: color})}
      </View>
    </IconContainer>
  );
};

export default Icon;
