import {Platform, StatusBar} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';

const safeAreaInsets = (insets: EdgeInsets | null) => {
  let defInsets = insets ?? {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  if (Platform.OS === 'android')
    defInsets = {
      ...defInsets,
      top: StatusBar.currentHeight ?? defInsets.top,
    };

  if (defInsets.bottom === 0)
    defInsets = {
      ...defInsets,
      bottom: 16,
    };
  return defInsets;
};

export default safeAreaInsets;
