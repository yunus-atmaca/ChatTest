import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: 0.5,
  },
  inner: {
    flex: 1,
    height: 40,
    borderRadius: 44,
    backgroundColor: '#F0F0F5',
    marginEnd: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    //backgroundColor: 'green',
    paddingHorizontal: 12,
  },
  input: {
    height: '100%',
    paddingVertical: 0,
    color: 'black',
  },
});
