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
  scaleFactor?: 'horizontal' | 'vertical';
  hasContainerStyle?: boolean;
};

const Icon: FC<Props> = ({
  size = 20,
  containerSize = 32,
  name,
  color,
  bgColor,
  onClick,
  containerStyle,
  hasContainerStyle = false,
}) => {
  const icColor = color ?? 'blue';
  const icContainerBg = bgColor ?? 'transparent';

  const IconContainer = onClick ? TouchableOpacity : View;

  return (
    <IconContainer
      style={[
        styles.container,
        hasContainerStyle && {
          height: containerSize,
          width: containerSize,
          backgroundColor: icContainerBg,
        },
        containerStyle,
      ]}
      onPress={onClick}
      activeOpacity={0.7}>
      <View style={{height: size, width: size}}>
        {Icons[name]({color: icColor})}
      </View>
    </IconContainer>
  );
};

export default Icon;
