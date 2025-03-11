import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export default function Search({color}: SvgProps) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 125 125" fill="none">
      <Path
        d="M90.0479 90.0476L118.064 118.064"
        stroke={color || 'black'}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 54.0273C6 80.5519 27.5025 102.055 54.0273 102.055C67.3124 102.055 79.3384 96.6603 88.033 87.9425C96.6979 79.2552 102.055 67.2668 102.055 54.0273C102.055 27.5025 80.5519 6 54.0273 6C27.5025 6 6 27.5025 6 54.0273Z"
        stroke={color || 'black'}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
