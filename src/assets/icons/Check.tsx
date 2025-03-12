import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export default function Check({color}: SvgProps) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 125 93" fill="none">
      <Path
        d="M6 54.0273L38.0182 86.0455L118.064 6"
        stroke={color || 'black'}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
