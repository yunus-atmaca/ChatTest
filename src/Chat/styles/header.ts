import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 36,
  },
  info: {
    flex: 1,
    paddingHorizontal: 12,
  },
});
