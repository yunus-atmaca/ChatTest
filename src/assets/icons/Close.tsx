import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export default function Close({color}: SvgProps) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 113 113" fill="none">
      <Path
        d="M112.064 7.40031L104.663 0L56.0318 48.6309L7.40096 0L0 7.40031L48.6312 56.0315L0 104.663L7.40096 112.063L56.0318 63.4321L104.663 112.063L112.064 104.663L63.4324 56.0315L112.064 7.40031Z"
        fill={color || 'black'}
      />
    </Svg>
  );
}
