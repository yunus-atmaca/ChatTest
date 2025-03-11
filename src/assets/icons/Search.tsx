import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export default function Search({color}: SvgProps) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 26 26" fill="none">
      <Path
        d="M11.2857 21.5714C16.9664 21.5714 21.5714 16.9664 21.5714 11.2857C21.5714 5.60507 16.9664 1 11.2857 1C5.60507 1 1 5.60507 1 11.2857C1 16.9664 5.60507 21.5714 11.2857 21.5714Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19 19L25 25"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
