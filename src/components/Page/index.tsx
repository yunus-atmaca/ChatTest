import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

import {safeAreaInsets} from '@/utils/helpers';

type Props = {
  removeTop?: boolean;
  removeBottom?: boolean;
};

const Page = ({
  removeTop = false,
  removeBottom = false,
  children,
}: Props & PropsWithChildren) => {
  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => {
        let defInsets = safeAreaInsets(insets);

        if (removeTop) defInsets = {...defInsets, top: 0};
        if (removeBottom) defInsets = {...defInsets, bottom: 0};

        return (
          <View
            style={[
              {flex: 1, backgroundColor: 'white'},
              {
                paddingBottom: defInsets.bottom,
                paddingTop: defInsets.top,
              },
            ]}>
            {children}
          </View>
        );
      }}
    </SafeAreaInsetsContext.Consumer>
  );
};

export default Page;
