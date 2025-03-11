import {Platform, StatusBar} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';

export const uuidv4 = () => {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16),
  );
};

export const safeAreaInsets = (insets: EdgeInsets | null) => {
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
