import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export default function Send({color}: SvgProps) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 129 129" fill="none">
      <Path
        d="M118.319 46.9903L28.6929 2.17742C25.1558 0.416979 21.1619 -0.209752 17.2556 0.382681C13.3493 0.975115 9.72077 2.75788 6.86473 5.48791C4.0087 8.21795 2.06414 11.7624 1.29617 15.638C0.528206 19.5136 0.974214 23.5317 2.57338 27.1446L17.9378 61.5224C18.2864 62.3536 18.466 63.2459 18.466 64.1472C18.466 65.0485 18.2864 65.9408 17.9378 66.7719L2.57338 101.15C1.27189 104.074 0.721689 107.276 0.972778 110.467C1.22387 113.657 2.26829 116.735 4.01112 119.419C5.75395 122.103 8.13994 124.309 10.9523 125.837C13.7646 127.364 16.914 128.165 20.1144 128.166C23.1119 128.136 26.0648 127.436 28.7569 126.117L118.383 81.3041C121.562 79.7048 124.234 77.2537 126.101 74.2242C127.968 71.1947 128.957 67.7059 128.957 64.1472C128.957 60.5885 127.968 57.0997 126.101 54.0702C124.234 51.0407 121.562 48.5895 118.383 46.9903H118.319ZM112.621 69.8448L22.9952 114.658C21.8183 115.223 20.4968 115.415 19.2078 115.207C17.9188 115 16.7241 114.404 15.7837 113.498C14.8432 112.592 14.2022 111.421 13.9464 110.141C13.6907 108.86 13.8325 107.533 14.3528 106.335L29.6531 71.9574C29.8512 71.4984 30.0222 71.0281 30.1653 70.549H74.2739C75.9718 70.549 77.6001 69.8745 78.8007 68.674C80.0013 67.4734 80.6758 65.8451 80.6758 64.1472C80.6758 62.4493 80.0013 60.821 78.8007 59.6204C77.6001 58.4198 75.9718 57.7454 74.2739 57.7454H30.1653C30.0222 57.2663 29.8512 56.796 29.6531 56.3369L14.3528 21.9591C13.8325 20.7617 13.6907 19.4339 13.9464 18.1536C14.2022 16.8734 14.8432 15.702 15.7837 14.7964C16.7241 13.8908 17.9188 13.2944 19.2078 13.0871C20.4968 12.8798 21.8183 13.0716 22.9952 13.6367L112.621 58.4496C113.67 58.9868 114.55 59.803 115.164 60.8083C115.779 61.8136 116.104 62.9689 116.104 64.1472C116.104 65.3254 115.779 66.4808 115.164 67.4861C114.55 68.4914 113.67 69.3076 112.621 69.8448Z"
        fill={color || 'black'}
      />
    </Svg>
  );
}
