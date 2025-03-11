import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export default function DoubleCheckmark({color}: SvgProps) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 122 62" fill="none">
      <Path
        d="M5 35.171L26.5507 56.7217L78.2724 5M56.7217 48.1014L65.3419 56.7217L117.064 5"
        stroke={color || '#535358'}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
